import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';

class Create extends Component {
    render() {
        return (
            <Form style={{ width: 550 }} className="mt-5 float-left text-center">
                <Form.Group>
                    <Form.Label>Content of Post</Form.Label>
                    <Form.Control type="email" placeholder="Enter content post" />
                    <Form.Text className="text-muted">
                        Don't worry, the post only belongs to you and you'll be credited as well.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" style={{width: 200}}>
                    Submit
                </Button>
            </Form>
        );
    }
}

export default Create;