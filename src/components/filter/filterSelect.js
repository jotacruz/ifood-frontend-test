import React from 'react';

import { Form } from 'react-bootstrap';

const FilterSelect = props => (
    <Form.Group controlId={`form.${props.row.id}`}>
        <Form.Control name={props.row.id} aria-label={props.row.name} as="select">
            <option value="">{props.row.name === "Locale" ? "Idioma" : props.row.name}</option>
            {props.row.values.map( ( data, index) => (
                <option key={index} value={data.value}>{data.name}</option>        
            ))}   
        </Form.Control>
    </Form.Group>  
)

export default FilterSelect;