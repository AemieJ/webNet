import React, {Component} from 'react';
import {Card, Image} from 'react-bootstrap';
import post from '../img/post.png';

class Display extends Component {
    render() {
        return (
            <div>
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                        }}
                    >
                        <img src={post} width="60%" />
                        { // <p style={{fontWeight: "bold", fontFamily: "Helvetica", fontSize: "500%"}}>Displaying </p>
                          // <p style={{backgroundColor: "blue", color: "white", fontFamily: "Helvetica", fontSize: "380%"}}>Blog Art.</p> 
                        }
                    </div>
                {this.props.posts.map((post, key)=>{
                    return (
                        <Card className="mt-5" style={{ width: '100%'}} key={key}>
                            <Card.Header>
                                <div className="float-left">Post {post.id.toString()} </div>
                    <div className="float-right" key={key}>Credits: {window.web3.utils.fromWei(post.postCredit.toString(), 'Ether')} Ether</div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{post.author}</Card.Subtitle>
                                <Card.Text>
                                    {post.content}
                                </Card.Text><hr />
                                <Card.Link href="#">TIP 0.1 Ether</Card.Link>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        );
    }    
}

export default Display;