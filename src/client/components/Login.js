import React, { Component } from 'react';
import {browserHistory} from  'react-router';
import instaluraLogo from '../sobre/imagens/logo-instalura.svg';


export default class Login extends Component {

    constructor(props){
        super(props);        
        this.state = {msg:this.props.location.query.msg};
    }

    envia(event){
        event.preventDefault();

        const requestInfo = {
            method:'POST',
            body:JSON.stringify({login:this.login.value,senha:this.senha.value}),
            headers:new Headers({
                'Content-type' : 'application/json' 
            })
        };

        fetch('http://localhost:8080/api/public/login',requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.text();
                } else {
                    throw new Error('Não foi possível fazer o login!');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token',token);
                document.cookie = `auth-token=${token}`;
                browserHistory.push('/timeline');
            })
            .catch(error => {
                this.setState({msg:error.message});
            });
    }

    signup() {
        browserHistory.push('/signup');
    }

    about() {
        browserHistory.push('/about');
    }

    render(){
        return (
            <div className="main-container">
                <div className="title-container">
                    <img src={instaluraLogo}/>
                    <h1>Instalura</h1>
                </div>

                <span className="error-message">{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input placeholder="Login" type="text" ref={(input) => this.login = input}/>
                    <input placeholder="Senha" type="password" ref={(input) => this.senha = input}/>
                    <div className="submit-container">
                        <input type="submit" value="Login"/>
                        <input type="button" value="Signup" onClick={this.signup}/>
                    </div>
                </form>
                <a href="#" class="about-anchor" onClick={this.about.bind(this)}>Sobre a alura</a>
            </div>
        );
    }
}