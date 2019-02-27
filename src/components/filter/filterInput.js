import React from 'react';

import { Form } from 'react-bootstrap';

const FilterInput = props =>  {
    const type = props.row.validation.primitiveType === 'INTEGER' ? 'number' : 'datetime-local';

    return (
        <Form.Group controlId={`form.${props.row.id}`}>
            <Form.Control 
                aria-label={props.row.name} 
                name={props.row.id} 
                type={type}
                min={ props.row.validation.min ? props.row.validation.min : 1 }
                max={ props.row.validation.max ? props.row.validation.max : "" }
                placeholder={props.row.name}>
            </Form.Control>
        </Form.Group>
    )
}

export default FilterInput;