import { combineReducers } from 'redux';
import expenses from './expenses.js';

const appReducers = combineReducers({
    expenses
});

export default appReducers;