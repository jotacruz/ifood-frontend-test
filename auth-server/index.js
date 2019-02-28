const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const querystring = require('querystring');

const cookieParser = require('cookie-parser');

const app = express();

const clienteId = "7ed2d30bc0b448f0b35ac08e594daaf9";
const clienteSecretId = "bb016e91b9dd43098764bc7396b23f70";
const auth = Buffer.from(clienteId + ":" + clienteSecretId).toString('base64');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const generateToken = async () => {

    const headers = {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-type': "application/x-www-form-urlencoded"
        }
    }

    try {
        const response = await axios.post("https://accounts.spotify.com/api/token", 
        querystring.stringify({"grant_type" : "client_credentials"})    
        , headers);

        const data = response.data;
        
        return data.access_token;
    } catch(error){
        return error;
    }
}

const retrievePlaylist = async (params = {}, token = "") => {

    if (token == "")
        token = await generateToken();  
    
    const headers = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const query = querystring.stringify(params);
    const urlApi = `https://api.spotify.com/v1/browse/featured-playlists?${query}`;

    try {
        const response = await axios.get(urlApi, headers);
        response.data.access_token = token;
        response.data.status = 200;

        return response.data;
    } catch(error){

        if (error.response.status === 401)
            return await retrievePlaylist(params, "")
        else 
            return { "status": error.response.status}        
    }
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/playlist', async (req, res) => {
    const { token } = req.cookies;
    const data = await retrievePlaylist(req.query, token);

    if ( data !== undefined && data.access_token !== "" && token !== data.access_token)
        res.cookie('token', data.access_token, {expire: 360000 + Date.now(), httpOnly: false});

    res.send(JSON.stringify(data));
});

app.listen(8080);

console.log('Running on port 8080');
