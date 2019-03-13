import React, { Component } from 'react';
import "../styles/signup.css";
import instaluraLogo from '../sobre/imagens/logo-instalura.svg';
import {connect} from 'react-redux';
import SignupApi from '../logicas/SignupApi';
import {browserHistory} from  'react-router';

export class ErrorMessage extends Component {
    render(){
        return (
            <li className="error-message" key={this.props.key}>
                {this.props.message}
            </li>
        );
    }
}

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg:this.props.location.query.msg == undefined ? '' : this.props.location.query.msg,
        };
    }

    about() {
        browserHistory.push('/about');
    }

    render() {
        return(
            <div className="main-container">
                <div className="title-container">
                    <img src={instaluraLogo}/>
                    <h1>Signup</h1>
                </div>

                <ul>
                    {
                        this.props.msg.map((item, id) => {
                            return <ErrorMessage message={item} key={id}/>
                        })
                    }
                </ul>
                <form onSubmit={(e) => {e.preventDefault(); this.props.submitSignup(e.target, this.login.value, this.senha.value, this.confirmPassword.value, this.profileUrl.value)}}>
                    <input placeholder="Login" required type="text"  onKeyUp={() => this.props.validateLogin(this.login.value, this.senha.value, this.confirmPassword.value)} ref={(input) => this.login = input}/>
                    <input placeholder="Senha" required type="password" autoComplete onKeyUp={() => this.props.validatePassword(this.login.value, this.senha.value, this.confirmPassword.value)} /*onKeyUp={this.validatePassword.bind(this)}*/ ref={(input) => this.senha = input}/>
                    <input placeholder="Confirmar senha" required type="password" autoComplete onKeyUp={() => this.props.validatePassword(this.login.value, this.senha.value, this.confirmPassword.value)} /*onKeyUp={this.validatePassword.bind(this)}*/ ref={(input) => this.confirmPassword = input}/>
                    <input placeholder="Url do perfil: https://github.com/nomeUsuario" required type="url" onKeyUp={() => this.props.validateUrl(this.profileUrl.value)}/*onKeyUp={this.validateUrl.bind(this)}*/ ref={(input) => this.profileUrl = input}/>

                    <div className="submit-container">
                        <input type="submit" value="Signup"/>
                    </div>
                </form>
                <a href="#" class="about-anchor" onClick={this.about.bind(this)}>Sobre a alura</a>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {msg : state.signup}
};

const mapDispatchToProps = dispatch => {
    return {
        validateLogin : (login, password, confirmPassword) => {
            dispatch(SignupApi.validateLogin(login, password, confirmPassword));
        },
        validatePassword : (login, password, confirmPassword) => {
            dispatch(SignupApi.validatePassword(login, password, confirmPassword));
        },
        validateUrl : (profile) => {
            dispatch(SignupApi.validateUrl(profile));
        },
        submitSignup : (target, login, password, confirmPassword, profile) => {
            dispatch(SignupApi.submitSignup(target, login, password, confirmPassword, profile));
        }
    }
}

const SignupContainer = connect(mapStateToProps,mapDispatchToProps)(Signup);
export default SignupContainer;