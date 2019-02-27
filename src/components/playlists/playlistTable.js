import React from 'react';

import PlaylistRow from './playlistRow';

import { Table } from 'react-bootstrap';

const PlaylistTable = props => (
    <React.Fragment>
        <h2 className="headTitle">{props.playlistTitle}</h2>
        {props.playlists.length > 0 && (
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Imagem</th>
                        <th>Playlist</th>
                    </tr>
                </thead>
                <tbody>
                    <PlaylistRow rows={props.playlists} />
                </tbody>
            </Table>
        )}
    </React.Fragment>
)

export default PlaylistTable;