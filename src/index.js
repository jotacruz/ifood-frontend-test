import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './store/reducers/playlistsReducers';

import Playlists from './components/playlists/playlists';
import Filter from './components/filter/filter';
import { Container, Jumbotron } from 'react-bootstrap';

import './assets/css/styles.css';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Container className="mainContainer">
            <Jumbotron fluid>
                <h1>Spotifood</h1>
            </Jumbotron>
            <Filter />
            <Playlists />
        </Container>
    </Provider>    
    , document.getElementById('root'));