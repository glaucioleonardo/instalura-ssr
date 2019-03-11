import React, { Component } from 'react';
import {browserHistory} from  'react-router';
import "../styles/signup.css";
import instaluraLogo from '../sobre/imagens/logo-instalura.svg';
import SignupApi from '../logicas/SignupApi';

export class ErrorMessage extends Component {
    render(){
        return (
            <li className="error-message" key={this.props.key}>
                {this.props.message}
            </li>
        );
    }
}

export default class Signup extends Component {
    constructor(props){
        super(props);        
        this.state = {msg:this.props.location.query.msg == undefined ? '' : this.props.location.query.msg};
    }

    

    //#region Validation
    validateLogin() {
        let valid = true;

        let currentValue = this.login.value;

        let currentMessage = this.state.msg == undefined ? '' : this.state.msg;
        let currentPassword = this.senha.value.toLowerCase();
        let currentconfirmedPassword = this.confirmPassword.value.toLowerCase();

        let emptyMessage = 'O campo de login não pode ficar em branco!';

        //#region Check for empty field
        if(currentValue.length === 0) {
            this.setState({msg: `${currentMessage}\n${emptyMessage}`});
            valid = false;
        } 
        else {     
            currentMessage = this.replaceAll(currentMessage, emptyMessage);
            this.setState({msg: currentMessage});
        }
        //#endregion

        //#region Compare with password
        setTimeout(() => {
            let pwd = this.compareLoginWithPassword(currentValue, currentPassword, currentconfirmedPassword);
            return valid && pwd;
        }, 300);
        //#endregion
    }

    validatePassword() {
        let valid = true;

        let currentMessage = this.state.msg == undefined ? '' : this.state.msg;
        let currentPassword = this.senha.value;
        let currentconfirmedPassword = this.confirmPassword.value;

        let passwordConflict = 'A senha digitada não confere!';

        if(currentPassword === currentconfirmedPassword) {
            let message = this.replaceAll(currentMessage, passwordConflict);
            this.setState({msg: message});
        }
        else {
            this.setState({msg: `${currentMessage}\n${passwordConflict}`});
            valid = false;
        }

        setTimeout(() => {
            let pwd = this.compareLoginWithPassword(this.login.value, currentPassword, currentconfirmedPassword);
            return valid && pwd;
        }, 300);
    }

    validateUrl() {
        let currentMessage = this.state.msg == undefined ? '' : this.state.msg;
        let errorMessage = 'Digite um URL de imagem válido!';

        let value = this.profileUrl.value;
        let validUrl = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
        let validImage = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(value);

        if(!(validUrl && validImage)){
            this.setState({msg: `${currentMessage}\n${errorMessage}`});
        }
        else {
            this.setState({msg: this.replaceAll(currentMessage, errorMessage)});
        }

        return validUrl && validImage;
    }

    SubmitSignup(event) {
        event.preventDefault();
        
        this.validateLogin();
        this.validatePassword();
        this.validateUrl();
        
        let login = this.login.value.length > 0 ? true : false;
        let password = this.senha.value.length > 0 ? true : false;
        let passwordConfirmation = this.confirmPassword.value.length > 0 ? true : false;
        let url = this.profileUrl.value.length > 0 ? true : false;
        let error = this.state.msg.length === 0 ? true : false;

        setTimeout(() => {
            if(login && password && passwordConfirmation && url && error) {
                let userData = {
                    "login": this.login.value,
                    "senha": this.senha.value,
                    "urlPerfil": this.profileUrl.value
                }

                this.sendData(userData);
            }
        }, 1000);
    }
    //#endregion
    sendData(userData){
        const requestInfo = {
            method:'POST',
            body:JSON.stringify(userData),
            headers:new Headers({
                'Content-type' : 'application/json' , 'x-auth-token' : ''
            })
        };

        console.log(userData);

        fetch('http://localhost:8080/usuariosZ', requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.text();
                } else {
                    throw new Error('Não foi possível criar o usuário');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token',token);
                document.cookie = `auth-token=${token}`;
                browserHistory.push('/');

                alert('Usuário criado com sucesso! Clique no OK para efetuar o login!');
                
            })
            .catch(error => {
                this.setState({msg:error.message});
                setTimeout(() => {
                    let message = this.replaceAll(this.state.msg, error.message);
                    this.setState({msg:message});
                }, 5000);

                this.clearFields();
            });
    }
    //#region Server update

    //#endregion

    //#region Tools
    getUniqueErrors() {
        let errors = this.state.msg.split("\n").filter(i => i.length > 0);
        return errors.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
    }

    compareLoginWithPassword(loginValue, Password, Confirmation) {
        let passwordConflict = 'A senha não pode ser igual ao login!';
        let currentMessage = this.state.msg == undefined ? '' : this.state.msg;
        
        if(loginValue.toLowerCase() == Password.toLowerCase() || loginValue.toLowerCase() == Confirmation.toLowerCase()) {
            this.setState({msg: `${currentMessage}\n${passwordConflict}`});
            return false;
        }
        else {
            currentMessage = this.replaceAll(currentMessage, passwordConflict);
            this.setState({msg: currentMessage});
            return true;
        }
    }

    replaceAll(str, toValue) {
        return str.replace(new RegExp('\n' + toValue, 'gi'), '');
    }

    clearFields() {
        this.login.value = "";
        this.senha.value = "";
        this.confirmPassword.value = "";
        this.profileUrl.value = "";
    }
    //#endregion
    
    //#region Render content
    render() {
        return(
            <div className="main-container">
                <div className="title-container">
                    <img src={instaluraLogo}/>
                    <h1>Signup</h1>
                </div>
                
                <ul>
                    {
                        this.getUniqueErrors().map((item, id) => {
                            return <ErrorMessage message={item} key={id}/>
                        })
                    }
                </ul>
                <form onSubmit={this.SubmitSignup.bind(this)}>
                    <input placeholder="Login" required type="text" onKeyUp={this.validateLogin.bind(this)} ref={(input) => this.login = input}/>
                    <input placeholder="Senha" required type="password" autoComplete onKeyUp={this.validatePassword.bind(this)} ref={(input) => this.senha = input}/>
                    <input placeholder="Confirmar senha" required type="password" autoComplete onKeyUp={this.validatePassword.bind(this)} ref={(input) => this.confirmPassword = input}/>
                    <input placeholder="Url do perfil: https://github.com/nomeUsuario" required type="url" onKeyUp={this.validateUrl.bind(this)} ref={(input) => this.profileUrl = input}/>

                    <div className="submit-container">
                        <input type="submit" value="Signup"/>
                    </div>
                </form>
            </div>
        )
    }
    //end#region
}