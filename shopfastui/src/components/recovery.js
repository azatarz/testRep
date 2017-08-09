import React, { Component } from 'react';
//import '../CSS/LoginPage.css';
import ReactDOM from 'react-dom';
import CreateAccount from './signup';
import ResetPassword from './ResetPassword';
import registerServiceWorker from '../registerServiceWorker';
import { browserHistory } from 'react-router';
import Routes from '../routes';
import App from '../App';
import LoginPage from '../components/signin';


class Recovery extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  
  resetHandler(event) {
    ReactDOM.render(<ResetPassword />, document.getElementById('root'));
    registerServiceWorker();
  }

  submitHandler(event) {
    var nameRegex = /^[a-zA-Z -]+$/;
    var emailRegex = /.+@.+\..+/;
    
    var emailLetterRegex = /.*[a-zA-Z].*/;

    //validate first
    var first = this.first.value;
    this.firstError.innerHTML = "";
    if (first.length === 0)
      this.firstError.innerHTML = "First name cannot be empty\n";
    if (!first.match(nameRegex) && first.length > 0)
      this.firstError.innerHTML = "First name can only cointain letters, space, and dash (-)\n";

    //validate last
    var last = this.last.value;
    this.lastError.innerHTML = "";
    if (last.length === 0)
      this.lastError.innerHTML = "Last name cannot be empty\n";
    if (!last.match(nameRegex) && last.length > 0)
      this.lastError.innerHTML = "Last name can only cointain letters, space, and dash (-)\n";


 var address = this.address.value;
 var phone = this.phone.value;
 var cardId = this.cardId.value;

    //validate email
    var email = this.email.value;
    this.emailError.innerHTML = "";
    if (email.length === 0)
      this.emailError.innerHTML = "Email cannot be empty\n";

   // if (!email.match(emailRegex) && email.length > 0)
     // this.emailError.innerHTML = "Invalid Email\n";
     if (email.match(emailLetterRegex) && !email.match(emailRegex))
      this.emailError.innerHTML = "Invalid Email or phone number\n";

    var valid = this.emailError.innerHTML.length === 0;
    if (valid) {
      var url = "http://localhost:8081/users/recovery/reset"
        var data = {
        email: email,
        address: address,
        phone: phone,
        cardId: cardId,
          first: first,
          last: last
        }
      };
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 404)
        
          this.emailError.innerHTML = "Invalid Inputs";
        else {
          
          alert("you can reset your password now");
          window.sessionStorage.setItem('id', responseJson.id);
         
          ReactDOM.render(<ResetPassword />, document.getElementById('root'));
    registerServiceWorker();
          
        }
      })
      .catch((error) => {
        console.error(error);
      });

    
    event.preventDefault();
  }

  render() {
   
    return (
      <div className="LoginPage">
        <h1>Reset your password</h1>
      
       <form onSubmit={this.submitHandler}>
          <div className="inputDiv">
            <label>First Name:<n/></label>
            <input type="text" name="first" ref={(input) => { this.first = input; }}/>
            <label className="errorLabel" ref={(label) => { this.firstError = label; }}/>
          </div>
          <div className="inputDiv">
            <label>Last Name:</label>
            <input type="text" name="last" ref={(input) => { this.last = input; }}/>
            <label className="errorLabel" ref={(label) => { this.lastError = label; }}/>
          </div>
           <div className="inputDiv">
            <label>phone number:</label>
            <input type="text" name="message" ref={(input) => { this.phone = input; }}/>
           
          </div>
          <div className="inputDiv">
            <label>Email:</label>
            <input type="text" name="email" ref={(input) => { this.email = input; }}/>
            <label className="errorLabel" ref={(label) => { this.emailError = label; }}/>
          </div>
           <div className="inputDiv">
            <label> card ID:</label>
            <input type="text" name="message" ref={(input) => { this.cardId = input; }}/>
           
          </div>
           <div className="inputDiv">
            <label>Address:</label>
            <input type="text" name="message" ref={(input) => { this.address = input; }}/>
           
          </div>
         
          <input type="submit" value="Submit" />
          
        </form>
        Designers: Rashid Sleem  and Charbel Yazbeck
      </div>


    );
  }

}

export default Recovery;