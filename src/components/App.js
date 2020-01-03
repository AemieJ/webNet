import React, { Component } from 'react';
import './App.css';
import WebsiteNetwork from '../abis/WebsiteNetwork.json';
import Navbars from './Pages/Navbars';
import Display from './Pages/Display';
import Home from './Pages/Home';
import Create from './Pages/Create';
import loader from './img/loader.png';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Web3 from 'web3';
import { type } from 'os';

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
      posts: [],
      loading: true
    }
    this.createPost = this.createPost.bind(this);
    this.postCredit = this.postCredit.bind(this);
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
      this.setState({posts : this.state.posts.sort((a,b)=> b.postCredit - a.postCredit)});
      console.log({posts: this.state.posts});
      this.setState({loading: false});

    } else {
      window.alert('Connect to the DWN network');
    }
  }

  async createPost(content) {
    let address = this.state.account.toString();
    let receipt = await this.state.websiteNetwork.methods.createPost(content).send({from: address});
  }

  async postCredit(id, postCredit) {
    let address = this.state.account.toString();
    let receipt = await this.state.websiteNetwork.methods.provideCredit(id).send({from: address, value: postCredit});
  }

  render() {
    return (
      <div>
        <Router>
        <Navbars account={this.state.account} />
        {this.state.loading 
        ? <div id="loader" className="text-center mt-5"><h3>Loading...</h3><br/> <img src={loader} height="420px" /></div>
        :<div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 col-md-12">
              <div className="content">
                <Switch>
                  <Route exact path="/create" component={() => <Create createPost={this.createPost}/>} />
                  <Route exact path="/display" component={() => <Display posts={this.state.posts} postCredit={this.postCredit}/>} />
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
        </div> }
        </Router>
      </div>
    );
  }
}

export default App;
