import React from 'react';

import { Form } from 'react-bootstrap';

const FilterInput = props =>  {
    return (
        props.row.validation.primitiveType === 'INTEGER' ?
            <Form.Group controlId={`form.${props.row.id}`}>
                <Form.Control 
                    aria-label={props.row.name} 
                    name={props.row.id} 
                    type='number'
                    min={ props.row.validation.min ? props.row.validation.min : 1 }
                    max={ props.row.validation.max ? props.row.validation.max : "" }
                    placeholder={props.row.name}>
                </Form.Control>
            </Form.Group>
        :
            <Form.Group controlId={`form.${props.row.id}`}>
                <Form.Control 
                    aria-label={props.row.name} 
                    name={props.row.id} 
                    type='datetime-local'
                    max="2999-12-31T23:59"
                    placeholder={props.row.name}>
                </Form.Control>
            </Form.Group>
    )
}

export default FilterInput;