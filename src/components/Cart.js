import React, { Component } from 'react';

export default class Cart extends Component{
  render(){

    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header"> Carrinho vazio </div>
        ) : (
          <div className="cart cart-header">
            Você tem {cartItems.length} no carrinho{" "}
          </div>
        )}
      </div>
    )
  }
}