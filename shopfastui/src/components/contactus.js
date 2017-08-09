import React, { Component } from 'react';
//import '../CSS/CreateAccount.css';
import ReactDOM from 'react-dom';
import LoginPage from './signin';
import { browserHistory } from 'react-router';
import Routes from '../routes'


class ContactUs extends Component {

  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

 backHandler(event) {
    ReactDOM.render(<LoginPage />, document.getElementById('root'));
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


 var message = this.message.value;
 

    //validate email
    var email = this.email.value;
    this.emailError.innerHTML = "";
    if (email.length === 0)
      this.emailError.innerHTML = "Email cannot be empty\n";

   // if (!email.match(emailRegex) && email.length > 0)
     // this.emailError.innerHTML = "Invalid Email\n";
     if (email.match(emailLetterRegex) && !email.match(emailRegex))
      this.emailError.innerHTML = "Invalid Email or phone number\n";




  var valid = this.firstError.innerHTML.length === 0 && this.lastError.innerHTML.length === 0 && this.emailError.innerHTML.length === 0;
    if (valid) {
      var url = "http://localhost:8081/contactus/contactus";
      var data = {
        email: email,
        message: message,
        //password: password,
        name: {
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
        if (responseJson.status === 409){
          //alert("Email already used\n");
          this.emailError.innerHTML = "Email already used\n";}
        else {
          window.sessionStorage.setItem('id', responseJson.id);
          ReactDOM.render(
           <Routes history={browserHistory} />,
           document.getElementById('root')
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    event.preventDefault();
  }

  
  render() {
    return (

       
      
      <div className="ContactUs">
       <h1>Contact us</h1>
       <h2>shopfast
             </h2>
    
         <img id="backButton" onClick={this.backHandler} src={require('../img/logo.jpg')} />     
  {/*<img id="backButton" onClick={this.backHandler} src={require('../img/logo.jpg')} />     */}
     
       
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
            <label>enter your message:</label>
            <input type="text" name="message" ref={(input) => { this.message = input; }}/>
           
          </div>
          <div className="inputDiv">
            <label>Email:</label>
            <input type="text" name="email" ref={(input) => { this.email = input; }}/>
            <label className="errorLabel" ref={(label) => { this.emailError = label; }}/>
          </div>
         
          <input type="submit" value="Submit" />
          
        </form>
        Designers: Rashid Sleem  and Charbel Yazbeck
      </div>
    );
  }

}


export default ContactUs;
