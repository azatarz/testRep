  import React, { Component } from 'react';
//import '../CSS/CreateAccount.css';
import ReactDOM from 'react-dom';
import Cart from './cart';
import { browserHistory } from 'react-router';
import Routes from '../routes';
import App from '../App';
import {Link} from 'react-router';
import registerServiceWorker from '../registerServiceWorker';


class Viewprofile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.cart = [];
    this.state.products = [];
    //this.handleClickproduct = this.handleClickproduct.bind(this);
    
    //this.submitHandler = this.submitHandler.bind(this);
    this.fetchprofile();
  }


  HomeHandler(e) {
   ReactDOM.render(<App />, document.getElementById('root'));
  }


  
  fetchprofile() {
      
    const url = "http://localhost:8081/users/" + sessionStorage.getItem('id')  ;
    //+ sessionStorage.getItem('id') ;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.state.products = []; 
    
        this.state.products.push({
         
          cardId: responseJson.cardId,
          email: responseJson.email,
          address: responseJson.address,
          phone: responseJson.phone,
          first: responseJson.first,
          last: responseJson.last
        });
      this.forceUpdate();
    })
    .catch((error) => {
  console.error(error);
    });
  }
 render() {
     var products = [];

    for(var i = 0; i < this.state.products.length; i++) {
      var product = this.state.products[i];
      console.log(product);
     
      products.push((<div> <div> phone number:{product.phone}</div>  <div> Address: {product.address}</div>  <div> Card ID:{product.cardId}
          </div>  <div> email: {product.email} </div>  <div> first name: {product.first}  </div>  <div>last name: {product.last} 
          
           </div> </div>));
  }
    

    

    return (
      <div className="viewprofile">
        <div className={ this.state.listClassName }>
          <h4>products</h4>
          {products}
        </div>
        
      
     
             <div className="buttonDiv">
          <button id="searchbybrand" onClick={this.HomeHandler}>
       home
          </button>
           </div>
         </div>
    );
  }
}
export default Viewprofile;