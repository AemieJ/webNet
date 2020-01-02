import React, { Component } from 'react';
import './App.css';
import WebsiteNetwork from '../abis/WebsiteNetwork.json';
import Navbars from './Pages/Navbars';
import Display from './Pages/Display';
import Home from './Pages/Home';
import Create from './Pages/Create';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Web3 from 'web3';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      websiteNetwork: null,
      postCount: 0,
      posts: []
    }
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Connect to metamask");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    this.setState({ account });
    const networkId = await web3.eth.net.getId();
    const networkData = WebsiteNetwork.networks[networkId];
    if (networkData) {
      const websiteNetwork = web3.eth.Contract(WebsiteNetwork.abi, networkData.address);
      const postCount = await websiteNetwork.methods.postCount().call();
      this.setState({websiteNetwork, postCount});

      for(var id=1; id <= postCount; ++id) {
        const post = await websiteNetwork.methods.posts(id).call();
        this.setState({
          posts: [...this.state.posts, post]
        });
      } 
      console.log({posts: this.state.posts});

    } else {
      window.alert('Connect to the DWN network');
    }

    
    

  }

  render() {
    return (
      <div>
        <Router>
        <Navbars account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 col-md-12">
              <div className="content">
                <Switch>
                  <Route exact path="/create" component={() => <Create />} />
                  <Route exact path="/display" component={() => <Display posts={this.state.posts}/>} />
                </Switch>
              </div>
            </main>
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                  <Switch>
                    <Route exact path="/" component={() => < Home account={this.state.account} />} />
                  </Switch>
              </div>
            </main>
          </div>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
