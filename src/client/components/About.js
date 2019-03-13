import React, { Component } from 'react';
import {browserHistory} from  'react-router';
import '../sobre/estilos/styles.css';

import instaluraLogo from '../sobre/imagens/logo-instalura.svg';

import groupImage from '../sobre/imagens/group.svg';
import workWithUs from '../sobre/imagens/usb.svg';
import festivalImage from '../sobre/imagens/festival.jpeg';
import photoEvents from '../sobre/imagens/camera.jpeg';
import libraryPhoto from '../sobre/imagens/livros.jpeg';
import facebookLogo from '../sobre/imagens/facebook.png';
import twitterLogo from '../sobre/imagens/twitter.png';
import googlePlusLogo from '../sobre/imagens/googleplus.png';

export default class About extends Component {
    constructor(props) {
        super(props);
        this._message = 'Em desenvolvimento';
        this.showAlert = this.showAlert.bind(this);
    }

    showAlert(e) {
        e.preventDefault();
        alert(this._message);
    } 

    home() {
        browserHistory.push('/');
    }

    render() {
        return(
            <div>
                <section className="header-container">
                    <div className="header-content">
                        <div alt="Voltar para a home page" onClick={this.home.bind(this)} className="logo-container">
                            <img src={instaluraLogo} alt="Instalura Logo"/>
                            <h1>Instalura</h1>
                        </div>
                        <input type="text" placeholder="Pesquisar"/>
                    </div>
                </section>
                <section className="content-container">
                    <div className="about-instalura-container">
                        <div className="about-instalura-content-container">
                            <div className="about-instalura-content">
                                <h2>Sobre o Instalura</h2>
                                <p>
                                    O instalura foi criado por uma equipe competente utilizando o que há de mais moderno
                                    em tecnologia, mas sempre primando pela experiência do usuário.
                                </p>
                                <input type="button" value="Saiba mais" onclick={this.showAlert}/>
                            </div>
                        </div>
                    </div>
                    <div className="our-team-container">
                        <div className="our-team-content-container">
                            <div className="our-team-content">
                                <h2>Nossa equipe</h2>
                                <img className="team-image" alt="Nossa equipe"/>
                                <p>
                                    O instalura foi criado por uma equipe competente utilizando o que há de mais moderno
                                    em tecnologia, mas sempre primando pela experiência do usuário.
                                </p>
                                <p>
                                    Venha conhecer nossa equipe. Quem sabe até trabalhar conosco!
                               </p>
                                <div className="know-team">
                                    <img src={groupImage} alt="Ícone grupo"/>
                                    <a href="#" onclick={this.showAlert}>Conheça nossa equipe</a>
                                </div>
                                <div className="work-with-us">
                                    <img src={workWithUs} alt="Ícone trabalhe com a gente"/>
                                    <a href="#" onclick={this.showAlert}>Trabalhe com a gente</a>
                                </div>
                            </div>
                            <div className="news-container">
                                <div className="news-content">
                                    <img src={festivalImage} alt="Foto festival"/>
                                    <h2>Instalura Festival</h2>
                                    <p>Venha curtir nosso festival com as melhores bandas da cidade</p>
                                </div>
                                <div className="news-content">
                                    <img src={photoEvents} alt="Foto registro fotográfico de eventos"/>
                                    <h2>Instalura Festival</h2>
                                    <p>Tenha suas fotografias em nossa revista</p>
                                </div>
                                <div className="news-content">
                                    <img src={libraryPhoto} alt="Foto biblioteca"/>
                                    <h2>Instalura mag</h2>
                                    <p>Biblioteca para construção de componentes reutilizáveis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="footer-container">
                    <div className="footer-content">
                        <div onClick={this.home.bind(this)} alt="Voltar para a home page" className="logo-container">
                            <img src={instaluraLogo} alt="Logo Instalura"/>
                            <h1>Instalura</h1>
                        </div>
                        <div className="social-network-container">
                            <a href="https://www.facebook.com/AluraCursosOnline/" target="_blank"><img src={facebookLogo} alt="Instalura Facebook"/></a>
                            <a href="https://twitter.com/aluraonline" target="_blank"><img src={twitterLogo} alt="Instalura Twitter"/></a>
                            <a href="https://plus.google.com/+Alura" target="_blank"><img src={googlePlusLogo} alt="Instalura Google+"/></a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}