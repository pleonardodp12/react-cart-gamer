import React, { Component } from 'react';
import Products from './components/Products';
import data from './data.json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    }
  }
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">Warrior Gamer Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              Carrinho
            </div>
          </div>
        </main>
        <footer>
          Desenvolvido por Leonardo Dias.
        </footer>
      </div>
    );
  }
}

export default App;
