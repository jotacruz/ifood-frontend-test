import React, { Component } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadPlaylists } from '../../store/actions/playlistsActions';
import PlaylistGroup from './playlistGroup';
import PlaylistFeedback from './playlistFeedback';

class List extends Component {
    componentDidMount(){

        this.props.loadPlaylists(this.props.params);
        this.timer = setInterval( () =>  {
            this.props.loadPlaylists(this.props.params);
        }, 30000)
        
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }
    
    render(){
        return(
            <React.Fragment>
                <PlaylistFeedback callBackMessage={this.props.callBackMessage} isLoading={this.props.isLoading} callBackStatus={this.props.callBackStatus} />
                <PlaylistGroup playlistTitle={this.props.playlistTitle} playlists={this.props.playlists} />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators( {loadPlaylists}, dispatch);
}

const mapStateToProps = state => {
    return {
        playlists: state.playlists,
        playlistTitle: state.playlistTitle,
        callBackMessage: state.callBackMessage,
        isLoading: state.isLoading,
        callBackStatus: state.callBackStatus,
        params: state.params,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)