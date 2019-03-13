import {combineReducers} from "redux";
import {timeline} from './timeline';
import {notificacao} from './header';
import {signup} from './signup';
 
const rootReducer = combineReducers({timeline, notificacao, signup});

export default rootReducer;

