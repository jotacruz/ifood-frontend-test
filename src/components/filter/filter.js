import React, { Component } from 'react'

import axios from 'axios'

import { Col, Form, Button, Alert } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {  loadPlaylists } from '../../store/actions/playlistsActions';
import FilterOptions from './filterOptions';

import filterImage from '../../assets/images/filter.png';

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
                } else if (field.name === 'timestamp'){
                    params[field.name] = field.value + ":00";
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

    resetFilter = () => {
        document.getElementById("form-filter").reset();
        this.props.loadPlaylists({}, true);
    }

    render(){

        const { filterOptions, showFilter, filterError } = this.state;

        const { isSearching, isLoading } = this.props;

        return(
            <React.Fragment>
                <Button variant="secondary" className="marginBottomGap" onClick={this.toggleFilter}>Filtro <img src={filterImage} alt="Filtro" /></Button>
                { showFilter && (
                    <Button variant="warning" className="marginFilterGap" onClick={this.resetFilter}>Limpar Filtro</Button>
                )}                    
                { showFilter && !filterError && (
                    <Form onSubmit={this.handleSubmit} id="form-filter">
                        <Form.Row>
                            <FilterOptions filterOptions={filterOptions} />
                            <Col sm="4">
                                <Button variant="primary" type="submit" block
                                    disabled={isSearching || isLoading}>
                                    {isSearching ? "Pesquisando..." : "Pesquisar" }
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