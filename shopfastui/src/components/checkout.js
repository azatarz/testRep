import React, { Component } from 'react';
//import '../CSS/CreateAccount.css';
import ReactDOM from 'react-dom';
import Cart from './cart';
import { browserHistory } from 'react-router';
import Routes from '../routes';
import Buy from './buy';
import {Link} from 'react-router';


class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.cart = [];
    this.state.products = [];
    this.handleClickproduct = this.handleClickproduct.bind(this);
    
    this.submitHandler = this.submitHandler.bind(this);
    this.fetchcart();
  }

cartHandler(event) {
    ReactDOM.render(<Cart />, document.getElementById('root'));
  }

  submitHandler(event) {


    var nameRegex = /^[a-zA-Z -]+$/;
    var numberRegex = /.*[0-9].*/;

    //validate country
    var country = this.country.value;
    this.countryError.innerHTML = "";
    if (country.length === 0)
      this.countryError.innerHTML = "Country cannot be empty\n";
    if (!country.match(nameRegex) && country.length > 0)
      this.countryError.innerHTML = "Country can only contain letters and space\n";

    //validate address
    var address = this.address.value;
    this.addressError.innerHTML = "";
    if (address.length === 0)
      this.addressError.innerHTML = "Address cannot be empty\n";
    
    //validate postal code
    var postalcode = this.postalcode.value;
    this.postalcodeError.innerHTML = "";
    if (postalcode.length === 0)
      this.postalcodeError.innerHTML = "Postal Code cannot be empty\n";
      if (!postalcode.match(numberRegex) && postalcode.length > 0)
      this.postalcodeError.innerHTML = "Postal code can only contain numbers\n";

      var cid = sessionStorage.getItem('id')  ;
  console.log('Checkout Cart ID' + cid);
   var valid = this.countryError.innerHTML.length === 0 && this.addressError.innerHTML.length === 0 && this.postalcodeError.innerHTML.length === 0;
    if (valid) {
      var url = "http://localhost:8081/cart/"+cid+"/checkout";
      var data = {
        location:
            {
            country: country,
            address: address,
            postalcode: postalcode
          },
          cartId : cid,

      };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
      }).then((response) => response.json())
      .then((responseJson) => 
        {
          
        if (responseJson.status === 409){
          this.postalcodeError.innerHTML = "You can't checkout twice\n";
        }
        else 
        {
          //window.sessionStorage.setItem('id', responseJson.id);
          ReactDOM.render(
           <Routes history={browserHistory} />,
           document.getElementById('root')
          );
           ReactDOM.render(<Buy />, document.getElementById('root')
           );
        }
       }
      )
      .catch((error) => {
        console.error(error);
      });
    }
    event.preventDefault();
  }

  fetchcart() {
      
    const url = "http://localhost:8081/cart/" + sessionStorage.getItem('id')  ;
    //+ sessionStorage.getItem('id') ;
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
          key: (i+1),
          id: responseJson.products[i].id,
          title: responseJson.products[i].title,
          price: responseJson.products[i].price,
          Quantity: responseJson.products[i].Quantity
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

  
  render() {
    var products = [];
    var totalprice = 0;
  var cid = sessionStorage.getItem('id')  ;
  console.log('Checkout Cart ID' + cid);
    for(var i = 0; i < this.state.products.length; i++) {
      var product = this.state.products[i];
     
      var tot = (parseInt(product.price)*parseInt(product.Quantity));
     
      totalprice += parseInt(tot);
      products.push(<div><span>{product.key}. {product.title}. Quantity: .{product.Quantity}. - (price: {product.price})</span></div>);
  }
    
    return (

       
      
      <div className="Checkout">
       <h1>Checkout</h1>
  {/*<img id="backButton" onClick={this.backHandler} src={require('../img/logo.jpg')} />     */}
        <form onSubmit={this.submitHandler}>
          <b>Additional Informations: <n/></b>
          <div className="inputDiv">
            <label>Country:<n/></label>
            <input type="text" name="country" ref={(input) => { this.country = input; }}/>
            <label className="errorLabel" ref={(label) => { this.countryError = label; }}/>
          </div>
          <div className="inputDiv">
            <label>Address:</label>
            <input type="text" name="address" ref={(input) => { this.address = input; }}/>
            <label className="errorLabel" ref={(label) => { this.addressError = label; }}/>
          </div>
          <div className="inputDiv">
            <label>Postal Code:</label>
            <input type="text" name="postalcode" ref={(input) => { this.postalcode = input; }}/>
            <label className="errorLabel" ref={(label) => { this.postalcodeError = label; }}/>
          </div>
           <input type="submit" value="Buy" />
        </form>
        <div className="cart">
          <div className={ this.state.listClassName }>
            <h4>Your orders:</h4>
            {products}
          </div>
        </div>
        <div><label>_____________________________</label></div>
     <label>Total Sum: </label>
     {totalprice}

        <div className="buttonDiv">
          <button id="App" onClick={this.cartHandler}>
          Edit/View cart
          </button>
          </div>
      </div>
    );
  }

}


export default Checkout;