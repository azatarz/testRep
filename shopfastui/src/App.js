
import {Link} from 'react-router';
import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CreateAccount from './components/signup';
import registerServiceWorker from './registerServiceWorker';
import { browserHistory } from 'react-router';
import LoginPage from './components/signin';
import ViewProducts from './components/products';
import Routes from './routes';
import ContactForm from './components/contactus';
import Searchbrand from './components/searchbybrand';
import Cart from './components/cart';
import ViewTrending from './components/trending';
import Profile from './components/profile';
import Viewprofile from './components/viewprofile';
import Recovery from './components/recovery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.id = window.sessionStorage.getItem('id');
    this.state.profileURL = "/profile/" + this.state.id;
  }
  signUpHandler(event) {
    ReactDOM.render(<CreateAccount />, document.getElementById('root'));
    registerServiceWorker();
  }
  backHandler(event) {
    ReactDOM.render(<LoginPage />, document.getElementById('root'));
  }

  LogInHandler(event) {
    ReactDOM.render(<LoginPage />, document.getElementById('root'));
    registerServiceWorker();
  }

   ProductHandler(event) {
    if(sessionStorage.getItem('id')==""){
      ReactDOM.render(<LoginPage/>, document.getElementById('root'));
      registerServiceWorker();
      return; 
    }
    ReactDOM.render(<ViewProducts/>, document.getElementById('root'));
    registerServiceWorker();
  }

  ContactusHandler(event) {
    ReactDOM.render(<ContactForm/>, document.getElementById('root'));
    registerServiceWorker();
  }

  VieawCartHandler(event) {
    ReactDOM.render(<Cart/>, document.getElementById('root'));
    registerServiceWorker();
  }

  SearchByBrandHandler(event) {
   

    if(sessionStorage.getItem('id')==""){
      ReactDOM.render(<LoginPage/>, document.getElementById('root'));
      registerServiceWorker();
      return;
    }
    ReactDOM.render(<Searchbrand/>, document.getElementById('root'));
    registerServiceWorker();
  }

  signoutHandler(event) {
    window.sessionStorage.setItem('id', "");
    ReactDOM.render(<LoginPage/>, document.getElementById('root'));
    registerServiceWorker();
  }
  TrendingHandler(event) {
   

    if(sessionStorage.getItem('id')==""){
      ReactDOM.render(<LoginPage/>, document.getElementById('root'));
      registerServiceWorker();
      return;
    }
    ReactDOM.render(<ViewTrending/>, document.getElementById('root'));
    registerServiceWorker();
  }

  profileHandler(event) {
   

    if(sessionStorage.getItem('id')==""){
      ReactDOM.render(<LoginPage/>, document.getElementById('root'));
      registerServiceWorker();
      return;
    }
    ReactDOM.render(<Profile/>, document.getElementById('root'));
    registerServiceWorker();
  }
  viewprofileHandler(event) {
   

    if(sessionStorage.getItem('id')==""){
      ReactDOM.render(<LoginPage/>, document.getElementById('root'));
      registerServiceWorker();
      return;
    }
    ReactDOM.render(<Viewprofile/>, document.getElementById('root'));
    registerServiceWorker();
  }

passwordrecoveryHandler(event) {
   

   
    ReactDOM.render(<Recovery/>, document.getElementById('root'));
    registerServiceWorker();
  }
   
  /*render() {
    return (
      <div className="App">
        <div className="App-intro">
          <div className="tabsDiv">
            <p><Link to="./signin" style={{ textDecoration: 'none' }}>sign in</Link></p>
            <p><Link to="./signup" style={{ textDecoration: 'none' }}>sign up</Link></p>
            {/*<p><Link to="/friends" style={{ textDecoration: 'none' }}>My Friends</Link></p>
            <p><Link to={this.state.profileURL} style={{ textDecoration: 'none' }}>Profile</Link></p>*/
          /*</div>
          <br/>
          {this.props.children}
        </div>
        <div className="App-body">
        </div>
      </div>
    );
  }*/

 render() {
    return (
      <div className="HomePage">
        <h1>Home Page</h1>
        <img id="backButton" onClick={this.backHandler} src={require('./img/logo.jpg')} /> 
 <div className="buttonDiv">
          <button id="home" onClick={this.signUpHandler}>
          Sign Up
          </button>
          </div>

          <div className="buttonDiv">
          <button id="signin" onClick={this.LogInHandler}>
          Sign In
          </button>
          </div>

          <div className="buttonDiv">
          <button id="products" onClick={this.ProductHandler}>
         Products
          </button>
          </div>

           <div className="buttonDiv">
          <button id="contact" onClick={this.ContactusHandler}>
         contact us
          </button>
          </div>

          <div className="buttonDiv">
          <button id="searchbybrand" onClick={this.SearchByBrandHandler}>
        Search
          </button>

          
          </div>
          <div className="buttonDiv">
          <button id="searchbybrand" onClick={this.TrendingHandler}>
        Trending
          </button>

          
          </div>
       {/*<div className="buttonDiv">
          <button id="searchbybrand" onClick={this.VieawCartHandler}>
       View Cart
          </button>
           </div>*/}
          
           <div className="buttonDiv">
          <button id="signup" onClick={this.signoutHandler}>
          Sign out
          </button>
          </div>

          
          <div className="buttonDiv">
          <button id="viewprofile" onClick={this.viewprofileHandler}>
          view profile
          </button>
          </div>

          <div className="buttonDiv">
          <button id="profile" onClick={this.profileHandler}>
          profile
          </button>
          </div>

          
          <div className="buttonDiv">
          <button id="passwordrecovery" onClick={this.passwordrecoveryHandler}>
          password recovery
          </button>
          </div>

              <img src="https://cdn.shopify.com/s/files/1/2180/5679/products/81o6pAPXNIL._SL1500.jpg?v=1500366795"/>
           <img src="https://cdn.shopify.com/s/files/1/2180/5679/products/81TFSr6Vx4L._SL1500.jpg?v=1500367264"/>
            <img src="https://cdn.shopify.com/s/files/1/2180/5679/products/51o6B8UHMML.jpg?v=1500368538"/>
             <img src="https://cdn.shopify.com/s/files/1/2180/5679/products/91OB6qzpPHL.jpg?v=1500368083"/>
</div>
);
}
}

export default App;
