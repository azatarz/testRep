import React, { Component } from 'react';
//import '../CSS/ResetPassword.css';
import ReactDOM from 'react-dom';
import LoginPage from './signin';
import { browserHistory } from 'react-router';
import Routes from '../routes'

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  backHandler(event) {
    ReactDOM.render(<LoginPage />, document.getElementById('root'));
  }

  submitHandler(event) {
    var emailRegex = /.+@.+\..+/;
    var passwordNumberRegex = /.*[0-9].*/;
    var passwordLetterRegex = /.*[a-zA-Z].*/;

    //validate email
    var email = this.email.value;
    this.emailError.innerHTML = "";
    if (email.length === 0)
      this.emailError.innerHTML = "Email cannot be empty\n";
    if (!email.match(emailRegex) && email.length > 0)
      this.emailError.innerHTML = "Invalid Email\n";

    //validate password
    var password = this.password.value;
    this.passwordError.innerHTML = "";
    if (password.length < 8)
      this.passwordError.innerHTML = "Password too short (must be at least 8 characters)\n";
    if (!password.match(passwordNumberRegex) && password.length > 7)
      this.passwordError.innerHTML = "Password must contain at least one number\n";
    if (!password.match(passwordLetterRegex) && password.length > 7)
      this.passwordError.innerHTML = "Password must contain at least one letter\n";

    //validate password2
    var password2 = this.password2.value;
    this.password2Error.innerHTML = "";
    if (password2.length === 0 && password.length > 0)
      this.password2Error.innerHTML = "Retype your password\n";
    if (password !== password2 && password2.length > 0 && password.length > 0)
      this.password2Error.innerHTML = "Your passwords do not match\n";

    var valid = this.emailError.innerHTML.length === 0 && this.passwordError.innerHTML.length === 0 && this.password2Error.innerHTML.length === 0;
    if (valid) {
      var url = "http://localhost:8081/users/reset";
      var data = {
        email: email,
        password: password
      };

      fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 404)
          this.emailError.innerHTML = "Email not found\n";
        else {
          window.sessionStorage.setItem('id', responseJson.id);
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
      <div className="ResetPassword">
        <img id="backButton" onClick={this.backHandler} src={require('../img/logo.jpg')} />
        <h1>Enter your new password:</h1>
        <form onSubmit={this.submitHandler}>
          <div className="inputDiv">
            <label>Email:</label>
            <input type="text" name="email" ref={(input) => { this.email = input; }}/>
            <label className="errorLabel" ref={(label) => { this.emailError = label; }}/>
          </div>
          <div className="inputDiv">
            <label>Password:</label>
            <input type="password" name="password" ref={(input) => { this.password = input; }}/>
            <label className="errorLabel" ref={(label) => { this.passwordError = label; }}/>
          </div>
          <div className="inputDiv">
            <label>Confirm Password:</label>
            <input type="password" name="password2" ref={(input) => { this.password2 = input; }}/>
            <label className="errorLabel" ref={(label) => { this.password2Error = label; }}/>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ResetPassword;
