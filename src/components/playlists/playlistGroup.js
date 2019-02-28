import React from 'react';

import PlaylistCard from './playlistCard';

const PlaylistGroup = props => (
    <React.Fragment>
        <h2 className="headTitle">{props.playlistTitle}</h2>
        {props.playlists.length > 0 && (
            <PlaylistCard rows={props.playlists} />
        )}
    </React.Fragment>
)

export default PlaylistGroup;