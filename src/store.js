import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'react-thunk';
import { productReducers } from './reducers/productReducers';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    product: productReducers 
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;