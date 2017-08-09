import React, { Component } from 'react';
//import '../CSS/CreateAccount.css';
import ReactDOM from 'react-dom';
import Cart from './cart';
import { browserHistory } from 'react-router';
import Routes from '../routes';
import App from '../App';
import {Link} from 'react-router';
import registerServiceWorker from '../registerServiceWorker';


class Buy extends Component {

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
   GoHomeHandler(event) {
    alert('You will pay when the products are delivered')
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
  }

  submitHandler(event) {


    var nameRegex = /^[a-zA-Z -]+$/;
    var numberRegex = /.*[0-9].*/;

    //validate country
    var namecard = this.namecard.value;
    this.namecardError.innerHTML = "";
    if (namecard.length === 0)
      this.namecardError.innerHTML = "Card name cannot be empty\n";
    if (!namecard.match(nameRegex) && namecard.length > 0)
      this.namecardError.innerHTML = "Card name can only contain letters and space\n";

    //validate address
    var cardnumber = this.cardnumber.value;
    this.cardnumberError.innerHTML = "";
    if (cardnumber.length === 0)
      this.cardnumberError.innerHTML = "Card Number cannot be empty\n";
      if (!cardnumber.match(numberRegex) && cardnumber.length > 0)
      this.cardnumberError.innerHTML = "Card Number can only contain numbers\n";
    
    //validate postal code
    var cardid = this.cardid.value;
    this.cardidError.innerHTML = "";
    if (cardid.length === 0)
      this.cardidError.innerHTML = "Card ID cannot be empty\n";
      if (!cardid.match(numberRegex) && cardid.length > 0)
      this.cardidError.innerHTML = "Card ID can only contain numbers\n";

      
  
  
   var valid = this.cardnumberError.innerHTML.length === 0 && this.namecardError.innerHTML.length === 0 && this.cardidError.innerHTML.length === 0;
    if (valid) {
      var id = sessionStorage.getItem('id')  ;
      console.log('Buy Cart ID' + id);
      var url = "http://localhost:8081/cart/"+id+"/buy";
      var data = {
        
         cardnumber: cardnumber,
         namecard: namecard,
         cardid: cardid, 
          cartId : id,
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
          this.cardidError.innerHTML = "You can't buy twice\n";
        }
        else 
        {
          // window.sessionStorage.setItem('id', responseJson.id);
          ReactDOM.render(
           <Routes history={browserHistory} />,
           document.getElementById('root')
          );
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

          alert("thank you for buying")
           ReactDOM.render(<App />, document.getElementById('root')
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
    for(var i = 0; i < this.state.products.length; i++) {
      var product = this.state.products[i];
      var productURL = "/product/" + product.id;
      var tot = (parseInt(product.price)*parseInt(product.Quantity));  
      totalprice += parseInt(tot);
      products.push((<div><span>{product.key}. {product.title}. Quantity:{product.Quantity} - (price:{product.price})</span></div>));
  }
    
    return (

       
      
      <div className="Buy">
       <h1>Online payement:</h1>
  {/*<img id="backButton" onClick={this.backHandler} src={require('../img/logo.jpg')} />     */}
        <form onSubmit={this.submitHandler}>
          <div className="inputDiv">
            <label>Card Name:<n/></label>
            <input type="text" name="namecard" ref={(input) => { this.namecard = input; }}/>
            <label className="errorLabel" ref={(label) => { this.namecardError = label; }}/>
          </div>
          <div className="inputDiv">
            <label>Card Number:</label>
            <input type="text" name="cardnumber" ref={(input) => { this.cardnumber = input; }}/>
            <label className="errorLabel" ref={(label) => { this.cardnumberError = label; }}/>
          </div>
          <div className="inputDiv">
            <label>Card ID:</label>
            <input type="text" name="cardid" ref={(input) => { this.cardid = input; }}/>
            <label className="errorLabel" ref={(label) => { this.cardidError = label; }}/>
          </div>
           <input type="submit" value="Buy" />
           <div className="buttonD iv">
             <h1> Pay at the door: </h1>
          <button id="App" onClick={this.GoHomeHandler}>
          Buy by cash
          </button>
          </div>
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

        <div className="buttonD iv">
          <button id="App" onClick={this.cartHandler}>
          Edit/View cart
          </button>
          </div>
           
      </div>
    );
  }

}


export default Buy;