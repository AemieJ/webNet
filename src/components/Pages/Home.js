import React, { Component } from 'react';
import logo from '../../logo.png';

class Home extends Component {
    render() {
        return (
            <div className="container-fluid mt-1">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center">
                        <div className="content mr-auto ml-auto">
                            <a
                                href="http://www.github.com/AemieJ"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={logo} className="App-logo" alt="logo" width="75%" height="100%" />
                            </a>
                            <h1>Decentralized Website Network</h1>
                            <h5 id="account"> {this.props.account} </h5>
                        </div>
                    </main>
                </div>
            </div>

        );
    }
}

export default Home;