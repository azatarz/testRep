import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import ContactForm from '../components/contactus';
import ViewProducts from '../components/products';
import Checkout from '../components/checkout';
import App from '../App';
//import Checkout from './checkout';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.cart = [];
    this.state.products = [];
    this.handleClickproduct = this.handleClickproduct.bind(this);
    this.enabled = false;
    this.fetchcart();
    //this.state.id = window.sessionStorage.getItem('id');
  
  }


checkoutHandler(event) {
    ReactDOM.render(<Checkout />, document.getElementById('root'));
  }


  
DeleteCartHandler(event) {
//var cartId= this.cartId.value;
var cartId=window.sessionStorage.getItem('id');
console.log(cartId);
    var data = {
        cartId:cartId }

    fetch("http://localhost:8081/cart/", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
      });

  alert("cart deleted");

    ReactDOM.render(< ViewProducts/>, document.getElementById('root'));
  }




  fetchcart() {
     
    const url = "http://localhost:8081/cart/" + sessionStorage.getItem('id')  ;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      this.state.products = []; 
      for(var i=0; i<responseJson.products.length; i++)
        this.state.products.push({
          key: i+1,
          id: responseJson.products[i].id,
          title: responseJson.products[i].title,
          price: responseJson.products[i].price
        });
      this.forceUpdate();
    })
    .catch((error) => {
  console.error(error);
    });
  }

  handleClickproduct(e) {
    console.log(e.currentTarget.dataset.id);

  }

  HomeHandler(e) {
   ReactDOM.render(<App />, document.getElementById('root'));
  }

  deleteitem(product, event) {
   let itemId= parseInt(product.id);
   let cartId= sessionStorage.getItem('id');
   event.preventDefault();
    var url = "http://localhost:8081/cart/"+ cartId + '/item/' + itemId ;

    fetch(url, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        }
      })
      .then(()=>{
          for(var i = 0; i < this.state.products.length; i++) {
            var obj = this.state.products[i];

            if(obj.id == itemId) {
                this.state.products.splice(i,1);
            }
          }
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
      var productURL = "/product/" + product.id;
      let deleteItemClick = this.deleteitem.bind(this, product)
      products.push((<div><span>{product.key}.{product.title}.price: {product.price}
          <div className="buttonDiv">
          <button id="deleteItem" onClick={deleteItemClick}>
           delete item
          </button>
           </div></span></div>));
  }

    if (products.length === 0)
    {
      products.push((<span className="emptyItemSpan">Empty cart</span>));
    }
      else
      {
        products.push(<div className="buttonDiv">
          <button id="checkout" onClick={this.checkoutHandler}>
          Checkout
          </button>
          </div>)
      }

    return (
      <div className="cart">
        <div className={ this.state.listClassName }>
          <h4>products</h4>
          {products}
        </div>
        
      
       
       <div className="buttonDiv">
          <button id="searchbybrand" onClick={this.DeleteCartHandler}>
       Delete Cart
          </button>
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

export default Cart;






 
