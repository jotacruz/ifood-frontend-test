import React from 'react';

import { Image, Button } from 'react-bootstrap';

const PlaylistaRow = props => (
    <React.Fragment>
        {props.rows.map( (list) => (
            <tr key={list.id} className="playlist-row">
                <td>{list.name}</td>
                <td>
                    <Image className="playlist-img" src={list.images[0].url} alt={list.name} roundedCircle  fluid />
                </td>
                <td>
                    <Button variant="primary" href={list.external_urls.spotify} target="_blank" rel="noopener" block="true" size="sm">Acessar Lista</Button>                                 
                </td>
            </tr>
        ))}
    </React.Fragment>
)

export default PlaylistaRow;