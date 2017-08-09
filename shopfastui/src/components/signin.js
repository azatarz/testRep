import React, { Component } from 'react';
//import '../CSS/LoginPage.css';
import ReactDOM from 'react-dom';
import CreateAccount from './signup';
import ResetPassword from './ResetPassword';
import registerServiceWorker from '../registerServiceWorker';
import { browserHistory } from 'react-router';
import Routes from '../routes';
import App from '../App';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  GoHomeHandler(event) {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
  }

  signUpHandler(event) {
    ReactDOM.render(<CreateAccount />, document.getElementById('root'));
    registerServiceWorker();
  }
  backHandler(event) {
    ReactDOM.render(<LoginPage />, document.getElementById('root'));
  }
  resetHandler(event) {
    ReactDOM.render(<ResetPassword />, document.getElementById('root'));
    registerServiceWorker();
  }

  // resetHandler(event) {
  //   ReactDOM.render(<ResetPassword />, document.getElementById('root'));
  //   registerServiceWorker();
  // }

  submitHandler(event) {
    var emailRegex = /.+@.+\..+/;
    var passwordNumberRegex = /.*[0-9].*/;
    var passwordLetterRegex = /.*[a-zA-Z].*/;
    var emailNumberRegex = /.*[0-9].*/;
    var emailLetterRegex = /.*[a-zA-Z].*/;
    
    //validate email
    var email = this.email.value;
    this.emailError.innerHTML = "";
   if (email.length === 0 ) 
        this.emailError.innerHTML = "Cannot be empty\n";
     if (email.match(emailLetterRegex) && !email.match(emailRegex))
     this.emailError.innerHTML = "Invalid Email or Phone number\n";  

    //validate password
    var password = this.password.value;
    this.passwordError.innerHTML = "";
    if (password.length < 8)
      this.passwordError.innerHTML = "Password too short (must be at least 8 characters)\n";
    if (!password.match(passwordNumberRegex) && password.length > 7)
      this.passwordError.innerHTML = "Password must contain at least one number\n";
    if (!password.match(passwordLetterRegex) && password.length > 7)
      this.passwordError.innerHTML = "Password must contain at least one letter\n";

    var valid = this.emailError.innerHTML.length === 0 && this.passwordError.innerHTML.length === 0 ;
    if (valid) {
      var url = "http://localhost:8081/users/signin"
        var data = {
        email: email,
        password: password,
        
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
          this.emailError.innerHTML = "Invalid username or password\n";
        else {
          
          alert("you have been signed in");
          window.sessionStorage.setItem('id', responseJson.id);
          //ReactDOM.render(
          // <Routes history={browserHistory} />,
         //  document.getElementById('root')
         
          //);
          ReactDOM.render(<App />, document.getElementById('root')
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });

    
    event.preventDefault();
  }

  render() {
   if (sessionStorage.getItem('id')!="") return( <button id="reset" onClick={this.resetHandler}>
            Reset Password
          </button>)
    return (
      <div className="LoginPage">
        <h1>Login Page</h1>
        <img id="backButton" onClick={this.backHandler} src={require('../img/logo.jpg')} />     
        <form onSubmit={this.submitHandler}>
          <div className="inputDiv">
            <label>Email or Phone number:</label>
            <input type="text" name="email" ref={(input) => { this.email = input;  }}/>
            <label className="errorLabel" ref={(label) => { this.emailError = label;  }}/>
          </div>
          <div className="inputDiv">
            <label>Password:</label>
            <input type="password" name="password" ref={(input) => { this.password = input; }}/>
            <label className="errorLabel" ref={(label) => { this.passwordError = label; }}/>
          </div>
          <input type="submit" value="Login" />
        </form>
        <div className="buttonDiv">
          <button id="login" onClick={this.signUpHandler}>
          Sign Up
          </button>
          
          {/*<button id="reset" onClick={this.resetHandler}>
            Reset Password
          </button>}*/}
        </div>

        <div className="buttonDiv">
          <button id="App" onClick={this.GoHomeHandler}>
          Go Home
          </button>
           {/*<button id="reset" onClick={this.resetHandler}>
            Reset Password
          </button>*/}
          </div>

      </div>


    );
  }

}

export default LoginPage;