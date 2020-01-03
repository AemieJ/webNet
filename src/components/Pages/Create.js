import React, {Component} from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import create from '../img/create.png';
import './Page.css';

class Create extends Component {
    render() {
        return (
            <div>
                <img src={create} className="Image" />
                <Form className="Form mt-5 float-left text-center"
                onSubmit={(event)=>{
                    event.preventDefault()
                    const content = this.postContent.value
                    this.props.createPost(content)
                    
                }}
                >
                    <Form.Group>
                        <Form.Label>Content of Post</Form.Label>
                        <Form.Control 
                            id="postContent" 
                            type="text" 
                            ref={(input) => {this.postContent = input}}
                            placeholder="Enter content post" 
                            required/>
                        <Form.Text className="text-muted">
                            Don't worry, the post only belongs to you and you'll be credited as well.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{width: 200}}>
                        Submit
                    </Button>
                </Form>
                
            </div>
        );
    }
}

export default Create;