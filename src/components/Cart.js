import React, { Component } from 'react';
import formatCurrency from '../utils'

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
        <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.name}/>
                </div>
                <div>
                  <div>{item.name}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x { item.count} {" "}
                    <button className="btn1" onClick={()=>this.props.removeFromCart(item)}> Remover</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length!==0 &&(
          <div className="cart">
            <div className="total">
              <div>
                Total: {" "}
                    {formatCurrency(
                      cartItems.reduce((a,c) =>  a +c.price * c.count, 0)
                    )}
              </div>
              <button className="btn">Comprar</button>
            </div>
          </div>   
        )}
        </div>
      </div> 
    );
  }
}