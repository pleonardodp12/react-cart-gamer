import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cartItems: localStorage.getItem("cartItems") ?
      JSON.parse(localStorage.getItem("cartItems")) : [],
    }
  }

  createOrder = (order) => {
    alert("Compra salva para: " + order.name)
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter((x)=> x._id !== product._id),
    });
    localStorage.setItem("cartItems",
    JSON.stringify(cartItems.filter((x)=> x._id !== product._id)));
  };

  addToCart = (product) => {
    const cartItems =  this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart){
      cartItems.push({...product, count: 1})
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  render(){
      return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            
            <a href="/"><img src="/images/helmet.svg" alt="capacete"/>Warrior Gamer Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />

                <Products addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}/>
              </div>
            </div>
          </main>
          <footer>
            Desenvolvido por Leonardo Dias.
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
