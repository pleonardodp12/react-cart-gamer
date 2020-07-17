import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import data from './data.json';
import Cart from './components/Cart';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      sort: "",
    }
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(x=>x._id !== product._id),
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
              <Filter
                count={this.state.products.length}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />

              <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} />
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
