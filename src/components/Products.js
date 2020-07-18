import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';

export default class Products extends Component {
  render() {
    return (
      <div>
        <Fade bottom cascade={true}>
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
                          className="cartImage"
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
        </Fade>
      </div>
    )
  }
}