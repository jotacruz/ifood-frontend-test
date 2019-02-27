import React from 'react';

import { Alert, Row } from 'react-bootstrap';

const PlaylistFeedback = props => (
    <Row className={props.isLoading || !props.callBackStatus ? "top-gap wrap-feedback active" : "top-gap wrap-feedback" }>
        { props.isLoading && (
            <Alert variant="info">Buscando Informações... <span className="loading"></span></Alert>
        )}
        { !props.callBackStatus && (
            <Alert variant="warning" className={props.isLoading ? 'disabled' : ''}>
                {props.callBackMessage}
            </Alert>
        )}
    </Row>
)

export default PlaylistFeedback;