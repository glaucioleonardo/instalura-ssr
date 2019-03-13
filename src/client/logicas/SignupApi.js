import {validateLoginAction, validatePasswordAction, validateProfileAction} from '../actions/actionCreator';
import {notifica} from '../actions/actionCreator';
import {browserHistory} from  'react-router';

let finalError = '';
export default class SignupApi {
    //#region Validation
    static validateLogin(currentValue, currentPassword, confirmPassword) {
        return dispatch => {
            let emptyMessage = 'O campo de login não pode ficar em branco!';

            new Promise((resolve, reject) => {
                if(currentValue.length === 0) {
                    finalError = `${finalError}\n${emptyMessage}`;
                    resolve(finalError);
                }
                else {
                    finalError = this.replaceAll(finalError, emptyMessage);
                    resolve(finalError);
                }

                reject(new Error('It was not possible to receive the values.'));

            }).then(() => {
                this.compareLoginWithPassword(currentValue, currentPassword.toLowerCase(), confirmPassword.toLowerCase());
                dispatch(validateLoginAction(this.getUniqueErrors(finalError)));
            })
        }
    }

    static validatePassword(loginValue, currentPassword, confirmPassword) {
        return dispatch => {
            let passwordConflict = 'A senha digitada não confere!';

            new Promise((resolve, reject) => {
                if(currentPassword === confirmPassword)
                {
                    finalError = this.replaceAll(finalError, passwordConflict);
                    resolve(finalError);
                }
                else {
                    finalError = `${finalError}\n${passwordConflict}`;
                    resolve(finalError);
                }

                reject(new Error('It was not possible to receive the values.'));

            }).then(() => {
                this.compareLoginWithPassword(loginValue, currentPassword.toLowerCase(), confirmPassword.toLowerCase());
                dispatch(validatePasswordAction(this.getUniqueErrors(finalError)));
            })
        }
    }

    static validateUrl(value) {
        return dispatch => {
            let errorMessage = 'Digite um URL de imagem válido!';
            let validUrl = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
            let validImage = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(value);

            if(!(validUrl && validImage)){
                finalError = `${finalError}\n${errorMessage}`;
                dispatch(validateProfileAction(this.getUniqueErrors(finalError)));
            }
            else {
                finalError = this.replaceAll(finalError, errorMessage);
                dispatch(validateProfileAction(this.getUniqueErrors(finalError)));
            }
        }
    }

    static submitSignup(target, login, password, passwordConfirmation, profile) {
        return dispatch => {
            let _error = finalError.length === 0 ? true : false;
            let _login = login.length > 0 ? true : false;
            let _password = password.length > 0 ? true : false;
            let _passwordConfirmation = passwordConfirmation.length > 0 ? true : false;
            let _url = profile.length > 0 ? true : false;

            if(_login && _password && _passwordConfirmation && _url && _error) {
                let userData = {
                    "login": login,
                    "senha": password,
                    "urlPerfil": profile
                };

                const requestInfo = {
                    method:'POST',
                    body:JSON.stringify(userData),
                    headers: new Headers({
                        'Content-type' : 'application/json' , 'x-auth-token' : ''
                    })
                };
                
                fetch('http://localhost:8080/usuarios', requestInfo)
                .then(response => {
                    if(response.ok) return response.text();
                    else throw new Error('Não foi possível criar o usuário');
                })
                .then(token => {
                    localStorage.setItem('auth-token',token);
                    document.cookie = `auth-token=${token}`;
                    dispatch(notifica('Usuário criado com sucesso!'));
                    
                    browserHistory.push('/');
                })
                .catch(error => {
                    finalError = error.message;

                    switch(error.message) {
                        case 'Failed to fetch': 
                            finalError = 'Falha na conexão com o servidor!'; 
                            break;
                        default: 
                            finalError; 
                            break; 
                    }

                    dispatch(validateLoginAction(finalError));
                    setTimeout(() => { 
                        finalError = '';
                        dispatch(validateLoginAction(finalError));
                    }, 5000);
                    target.reset();
                }); 
            }
        }
    }
    //#endregion

    //#region Tools
    static replaceAll(str, toValue) {
        return str.replace(new RegExp(`\n${toValue}`, 'gi'), '');
    }

    static compareLoginWithPassword(loginValue, Password, Confirmation) {
        let passwordConflict = 'A senha não pode ser igual ao login!';
        finalError;

        if(loginValue.toLowerCase() == Password.toLowerCase() || loginValue.toLowerCase() == Confirmation.toLowerCase()) {
            finalError = `${finalError}\n${passwordConflict}`;
            return finalError;
        }
        else {
            finalError = this.replaceAll(finalError, passwordConflict);
            return finalError;
        }
    }

    static getUniqueErrors(error) {
        error = error.split('\n').filter(i => i.length > 0);
        return error.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
    }

    static clearFields() {
        this.login.value = "";
        this.senha.value = "";
        this.confirmPassword.value = "";
        this.profileUrl.value = "";
    }
    //#endregion
}