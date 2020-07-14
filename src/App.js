import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import data from './data.json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: data.products,
      sort: "",
    }
  }

  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState(state => ({
      sort: sort, 
      products: this.state.products.slice().sort((a,b) => (
        sort === "lowest" ?
        ((a.price > b.price) ? 1:-1):
        sort ==="highest" ?
        ((a.price < b.price) ? 1:-1):
        ((a._id > b._id) ? 1:-1)
      ))
    }))
  }

  filterProduct(e){}
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">Warrior Gamer Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                      sort={this.state.sort}
                      filterProducts={this.filterProducts}
                      sortProducts={this.sortProducts}
              >

                          </Filter>
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
