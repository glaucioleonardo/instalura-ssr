import React from "react";
import {Route, IndexRoute} from "react-router";
import Home from "./components/Home";
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import About from './components/About';
import {matchPattern} from 'react-router/lib/PatternUtils';

function verificaAutenticacao(nextState,replace) {

  const navegador = typeof window !== 'undefined';

  if(navegador) {
    const resultado = matchPattern('/timeline(/:login)',nextState.location.pathname);
    const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;
    
    if(enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null){
      replace('/?msg=Você precisa estar logado para acessar o endereço');
    }
  }
}

export const routes = (
  <Route path="/">
	  <IndexRoute component={Login}/>
    <Route path="/logout" component={Logout}/>	    	    	
    <Route path="/Signup" component={Signup}/>	    	    	
    <Route path="/about" component={About}/>	    	    	
	  <Route path="/timeline(/:login)" component={Home} onEnter={verificaAutenticacao}/>  
  </Route>
);
