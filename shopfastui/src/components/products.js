import React, { Component } from 'react';
//import '../CSS/Search.css';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import registerServiceWorker from '../registerServiceWorker';
import App from '../App';
import Img from 'react-image';
import Cart from '../components/cart';


class ViewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.products = [];
    this.productId;
    this.productQuantity;
    this.enabled = false;
    this.cartHandler = this.cartHandler.bind(this);
    this.handleClickProduct = this.handleClickProduct.bind(this);

  }
  //   this.state = {
  //       inputs : [
  //           { type: 'email' }
  //       ]
  //   };
  // }

 componentDidMount() {
        this.serverRequest = fetch('http://localhost:8081/products/products').then(function(response) {
            response.json().then(function(json) {
                var newProducts = [];
                for(var i=0; i<json.products.length; i++)
                  newProducts.push({
                  key: (i+1),
                  id: json.products[i].id,
                  title: json.products[i].title,
                  price: json.products[i].variants[0].price
                })
                this.setState({products : newProducts});
            }.bind(this));
        }.bind(this));
        
    }

 
 
  handleClickProduct(e) {
    console.log(e.currentTarget.dataset.id);
   
  }
   HomeHandler(e) {
   ReactDOM.render(<App />, document.getElementById('root'));
  }

VieawCartHandler(event) {
    ReactDOM.render(<Cart/>, document.getElementById('root'));
    registerServiceWorker();
  }
  
  
  
  cartHandler(product, event) {
   let productId = parseInt(product.id);
   let productQuantity = parseInt(this.refs[productId].value);
   let productTitle= product.title;
   let productPrice= product.price;
   event.preventDefault();
   console.log(window.sessionStorage.getItem('id'))
    var url = "http://localhost:8081/cart/"+sessionStorage.getItem('id');
    
   const data = {
        productId:productId, //sessionStorage.getItem('productId'),
        productQuantity:productQuantity,
        productTitle:productTitle,
        productPrice:productPrice
      }
     console.log('My Data is :' + JSON.stringify(data) )
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    headers: {
          "Content-Type": "application/json"
        }}
    ).then((response) => response.json())
      .then((responseJson) => {
        this.enabled = false;
        this.forceUpdate();
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }


  render() {
 
    return (
    
      <div className = "prod" >
        
           <h1>Products  </h1>
          
           {
             this.state.products.map((prod) => {
               let boundItemClick = this.cartHandler.bind(this, prod);
                return (
                  <form onSubmit={boundItemClick}>
                  <div className="itemDiv" data-id={prod.id}>
                    <span>{prod.key}.{prod.id}-{prod.title}   price: {prod.price}</span>
                    <div className="inputDiv">
                      <label>Quantity</label>
                      <input type="text" ref={prod.id}/>
                    </div>
                    <input type="submit" value="add to cart" />
                  </div>
                  </form>
                )
              },this)
           }

            
       <div className="buttonDiv">
          <button id="searchbybrand" onClick={this.VieawCartHandler}>
       View Cart
          </button>
           </div>

            <div className="buttonDiv">
          <button id="searchbybrand" onClick={this.HomeHandler}>
       home
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


export default ViewProducts;

   
  