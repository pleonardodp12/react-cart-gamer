import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: null
    };
  }

  openModal = (product) => {
    this.setState({ product });
  }

  closeModal = () => {
    this.setState({ product: null});
  }
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade={true}>
          <ul className="products">
            {this.props.products.map(product => (
              <li key={product.id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => this.openModal(product)}
                  >
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
        {product && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>
                  x
                </button>
                <div className="product-details">
                  <img src={product.image} alt={product.name}/>
                  <div className="product-details-description">
                    <p>
                      <strong>
                        {product.name}
                      </strong>
                    </p>
                    <p>
                      Descrição:  {" "}{product.description}
                    </p>
                    <p>
                      Nota: {" "}{product.rating}
                    </p>
                    <p>
                      Avaliações: {" "}{product.numReviews}
                    </p>
                    <div className="product-price-modal">
                      <div>{formatCurrency(product.price)}</div>
                      <button className="btn" onClick={() =>{this.props.addToCart(product); this.closeModal();}}> Adicionar ao carrinho</button>
                    </div>
                  </div>
                </div>
              </Zoom>
            </Modal>
          )}
      </div>
    )
  }
}