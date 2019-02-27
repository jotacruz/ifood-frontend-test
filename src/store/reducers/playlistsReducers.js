const initialState = {
    isLoading: false,
    isSearching: false,
    playlistTitle: "",
    playlists: [],
    callBackStatus: true,
    params: {},
    callBackMessage: "Não foi possível estabelecer conexão com o servidor"
}

export default function playlistsReducers(state = initialState, action){
    switch(action.type){
        case "LOAD_PLAYLISTS_START":
            return {
                ...state, 
                isLoading: true,
                isSearching: action.payload
            }
        case "LOAD_PLAYLISTS_SUCCESS":
            return {
              ...state, 
              callBackStatus: true, 
              playlistTitle: action.payload.message, 
              playlists: [...action.payload.playlists.items], 
              isLoading: false,
              isSearching: false,
              params: action.payload.params
            }
        case "LOAD_PLAYLISTS_ERROR":
            return {
                ...state, 
                callBackStatus: false, 
                callBackMessage: action.payload ? action.payload.message : state.callBackMessage,
                isLoading: false,
                isSearching: false 
            }        
        default:
            return state;
    }
}