import React from 'react';

import { Card, Button, CardColumns } from 'react-bootstrap';

import defaultPlaylistLogo from '../../assets/images/spotify.jpg'
import speakerImage from '../../assets/images/speaker.png';
export default class PlaylistCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            inputSearch: ""
        }

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(e){
        this.setState({
            inputSearch: e.target.value
        })
    }

    renderList(){
        return this.props.rows
             .filter( value => value.name.toLowerCase().includes(this.state.inputSearch.toLowerCase()))
             .map( list => {
                 const image = list.images !== undefined && list.images[0].url !== undefined ? list.images[0].url : defaultPlaylistLogo; 
                 return(
                    <Card key={list.id} className="playlist-row grid">
                        <Card.Header>{list.name}</Card.Header>
                        <Card.Img className="playlist-img" src={image} alt={list.name} variant="roundedCircle"></Card.Img>
                        <Button variant="info" href={list.external_urls.spotify} target="_blank" rel="noopener" size="sm" block="true">Acessar Playlist <img src={speakerImage} alt="Acessar Playlist"/> </Button>                                 
                    </Card>
                )
             })
    }

    render(){
        return(
            <React.Fragment>
                <input type='text' placeholder="Encontre a playlist pelo nome..." onChange={this.onSearchChange} className="inputSearch" value={this.state.input} />
                <CardColumns>
                    {this.renderList()}
                </CardColumns>
            </React.Fragment>
        )
    }
}