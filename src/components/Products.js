import React, { Component } from 'react';
import formatCurrency from '../utils';

export default class Products extends Component {
  render() {
    return (
      <div className="test">
        <ul className="products">
          {this.props.products.map(product => (
            <li key={product.id}>
              <div className="product">
                <a href={"#" + product._id}>
                  <img src={product.image} alt={product.name}/>
                  <p>
                    {product.name}
                  </p>
                </a>
                <div className="product-price">
                  <div>
                    {formatCurrency(product.price)}
                  </div>
                  <div onClick={() => {this.props.addToCart(product)}} className="btn">
                    <img
                        className="cart"
                        src="/images/cart.svg"
                        alt="Icone carrinho"
                    />
                    <span>Adicionar ao carrinho </span>{" "}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}