 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import registerServiceWorker from '../registerServiceWorker';
import App from '../App';
import LoginPage from '../components/signin';

class searchbrand extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.products = [];
   
    this.state.query = "";
    this.handleClickProduct = this.handleClickProduct.bind(this);
    
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    var keyword = this.keyword.value;
    this.fetchProducts(keyword);
  
    event.preventDefault();
  }

  fetchProducts(keyword) {
    fetch('http://localhost:8081/products/searchbybrand?keyword=' + keyword, {
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
          vendor: responseJson.products[i].title
        });
      this.forceUpdate();
    })
    .catch((error) => {
      console.error(error);
    });
  }

 
 handleClickProduct(e) {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
   
  }
 backHandler(event) {
    ReactDOM.render(<LoginPage />, document.getElementById('root'));
  }

  render() {
    var products = [];
    

    if (this.state.products.length > 0)
      products.push((<h2>search</h2>));

    for(var i = 0; i < this.state.products.length; i++) {
      var product = this.state.products[i];
      var productURL = "/searchbybrand/" + product.id;
      products.push((<Link to={productURL} style={{ textDecoration: 'none' }}><div className="itemDiv" data-id={product.id} onClick={this.handleClickProduct}><span>{product.key}. {product.vendor}</span></div></Link>));
    }


    return (
      <div className = "Search">
        
        <div className = "searchDiv">
           <img id="backButton" onClick={this.backHandler} src={require('../img/logo.jpg')} /> 
          <form onSubmit={this.submitHandler}>
            <span>Enter Keywords:</span>
            <input type="text" name="keyword" ref={(input) => { this.keyword = input; }}/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
        <div className = "productsDiv">
          {products}
        </div>
         <img src="https://cdn.shopify.com/s/files/1/2180/5679/products/81o6pAPXNIL._SL1500.jpg?v=1500366795"/>
           <img src="https://cdn.shopify.com/s/files/1/2180/5679/products/81TFSr6Vx4L._SL1500.jpg?v=1500367264"/>
            <img src="https://cdn.shopify.com/s/files/1/2180/5679/products/51o6B8UHMML.jpg?v=1500368538"/>
             <img src="https://cdn.shopify.com/s/files/1/2180/5679/products/91OB6qzpPHL.jpg?v=1500368083"/>
      </div>
    );
  }
}

export default searchbrand;
