import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import UploadPage from './UploadPage';
import './Login.css';

var apiBaseUrl = "http://localhost:4000/api/";

class Login extends Component {
  constructor(props) {
    super(props);
    var localloginComponent = [];
    localloginComponent.push(
      <MuiThemeProvider>
        <div>
          <TextField
            hintText="Enter your User Name"
            floatingLabelText="User Name"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
        </div>
      </MuiThemeProvider>
    )
    this.state = {
      username: '',
      password: '',
      menuValue: 1,
      loginComponent: localloginComponent,
      loginRole: 'student'
    }
  }
  componentWillMount() {
    // console.log("willmount prop values",this.props);
    if (this.props.role !== undefined) {
      if (this.props.role === 'Buyer') {
        console.log("in Buyer componentWillMount");
        var localloginComponent = [];
        localloginComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Enter your User Name"
                floatingLabelText="User Name"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({ menuValue: 1, loginComponent: localloginComponent, loginRole: 'Buyer' })
      }
      else if (this.props.role === 'Seller') {
        console.log("in Seller componentWillMount");
        // eslint-disable-next-line no-redeclare
        var localloginComponent = [];
        localloginComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Enter your User Name"
                floatingLabelText="Seller ID"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({ menuValue: 2, loginComponent: localloginComponent, loginRole: 'Seller' })
      }
    }
  }
  handleClick(event) {
    var self = this;
    var payload = {
      "userid": this.state.username,
      "password": this.state.password,
      "role": this.state.loginRole
    }
    axios.post(apiBaseUrl + 'login', payload)
      .then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Login successfull");
          var uploadScreen = [];
          uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole} />)
          self.props.appContext.setState({ login: [], uploadScreen: uploadScreen })
        }
        else if (response.data.code === 204) {
          console.log("Username password do not match");
          alert(response.data.success)
        }
        else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleMenuChange(value) {
    console.log("menuvalue", value);
    var loginRole;
    if (value === 1) {
      var localloginComponent = [];
      loginRole = 'Buyer';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your User Name"
              floatingLabelText="Buyer Id"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    else if (value === 2) {
      // eslint-disable-next-line no-redeclare
      var localloginComponent = [];
      loginRole = 'Seller';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your User Name"
              floatingLabelText="Seller Id"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    this.setState({
      menuValue: value,
      loginComponent: localloginComponent,
      loginRole: loginRole
    })
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <MuiThemeProvider>
            <AppBar
              title="Login"
            />
          </MuiThemeProvider>
          <MuiThemeProvider>
            <div>
              {/* <p>Login as:</p> */}
              <DropDownMenu value={this.state.menuValue} onChange={(event, index, value) => this.handleMenuChange(value)}>
                <MenuItem value={1} primaryText="Buyer" />
                <MenuItem value={2} primaryText="Seller" />
              </DropDownMenu>
            </div>
          </MuiThemeProvider>
          {this.state.loginComponent}
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;