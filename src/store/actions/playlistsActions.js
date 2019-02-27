import axios from 'axios';

export function loadPlaylists(params = {}, search = false){
    return async dispatch => {

        dispatch(loadPlaylistsStart(search));

        try{
            const response = await axios.get("http://localhost:8080/playlist", 
            {
                withCredentials: true,
                params: params
            });
            
            const data = response.data;
            data.search = search;
            data.params = params;

            if (data.status === 200)
                dispatch(loadPlaylistsSuccess(data));
            else 
                dispatch(loadPlaylistsError(data));
        } catch (e){
            const error = {message: "Falha ao realizar conexão com o servidor", code: 500}
            dispatch(loadPlaylistsError(error));
        }

    }
}

export function loadPlaylistsStart(search){
    return {
        type: "LOAD_PLAYLISTS_START",
        payload: search
    }
}

export function loadPlaylistsSuccess(data){
    return{
        type: "LOAD_PLAYLISTS_SUCCESS",
        payload: data
    }
}

export function loadPlaylistsError(error) {
    return {
        type: "LOAD_PLAYLISTS_ERROR",
        payload: error
    }
}