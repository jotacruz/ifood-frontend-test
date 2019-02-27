import React, { Component } from 'react'

import axios from 'axios'

import { Col, Form, Button, Alert } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {  loadPlaylists } from '../../store/actions/playlistsActions';
import FilterOptions from './filterOptions';

class Filter extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterOptions: [],
            showFilter: false,
            filterError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        try {
            const response = await axios.get("http://www.mocky.io/v2/5a25fade2e0000213aa90776");
            const data = response.data;

            this.setState({ ...this.state, filterOptions: data.filters });
        } catch(e){
            this.setState({ ...this.state, filterOptions: [], filterError: true });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        
        const form = e.target;
        
        const params = {}
        
        for (const field of form.elements){
            if (field.type !== 'submit' && field.value !== ""){
                if (field.name === 'offset'){
                    params[field.name] = Number.parseInt(field.value, 10) - 1
                } else {
                    params[field.name] = field.value
                }
            }
        }
       
        this.props.loadPlaylists(params, true);
    }

    toggleFilter = () => {
        this.setState({ ...this.state, showFilter: !this.state.showFilter })
    }

    render(){

        const { filterOptions, showFilter, filterError } = this.state

        return(
            <React.Fragment>
                <Button className="marginBottomGap" onClick={this.toggleFilter}>Filtro</Button>
                { showFilter && !filterError && (
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <FilterOptions filterOptions={filterOptions} />
                            <Col sm="4">
                                <Button variant="primary" type="submit" block
                                    disabled={this.props.isSearching || this.props.isLoading}>
                                    {this.props.isSearching ? "Pesquisando..." : "Pesquisar" }
                                </Button>            
                            </Col>
                        </Form.Row>
                    </Form>
                )}

                { filterError && (
                    <Alert variant="warning">Não foi possível carregar os campos de busca no momento</Alert>    
                )}
            </React.Fragment>
        )
    }
}

const mapsStateToProps = state => {
    return {
        isLoading: state.isLoading,
        isSearching: state.isSearching
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ loadPlaylists }, dispatch);
}

export default connect(mapsStateToProps, mapDispatchToProps)(Filter);