import React from 'react';

import { Col } from 'react-bootstrap';

import Input from './filterInput';
import Select from './filterSelect';

const FilterOptions = props => (
    props.filterOptions.map( (row, index) =>{
        return row.values ?
            <Col sm="4" key={index}>
                <Select row={row} />
            </Col> 
        :   
           <Col sm="4" key={index}>
                <Input row={row} />
           </Col> 
    })
)

export default FilterOptions;