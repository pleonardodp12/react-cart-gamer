import React, { Component } from 'react';
import formatCurrency from '../utils'
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderActions';

class Cart extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0),
    };
    this.props.createOrder(order);
  }

  closeModal = () => {
    this.props.clearOrder();
  }
  render(){

    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header"> Carrinho vazio </div>
        ) : (
          <div className="cart cart-header">
            Você tem {cartItems.length} no carrinho{" "}
          </div>
        )}

        {
          order &&
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className='close-modal' onClick={this.closeModal}>x</button>
                <div className="order-details">
                  <h3 className="success-message">Compra confirmada</h3>
                  <h2> Compra {order._id}</h2>
                  <ul>
                    <li>
                      <div>Name:</div>
                      <div>{order.name}</div>
                    </li>
                    <li>
                      <div>Email:</div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>Endereço:</div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>Data da compra:</div>
                      <div>{order.createAt}</div>
                    </li>
                    <li>
                      <div>Total:</div>
                      <div>{formatCurrency(order.total)}</div>
                    </li>
                    <li>
                      <div>Carrinho:</div>
                      <div>{order.cartItems.map((x) =>(
                        <div>{x.count} {" x "} {x.name}{" "}</div>
                      ))}</div>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Modal>
        }
        <div>
        <div className="cart">
          <Fade left cascade>
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
          </Fade>
        </div>
        {cartItems.length!==0 &&(
          <div>
          <div className="cart">
            <div className="total">
              <div>
                Total: {" "}
                    {formatCurrency(
                      cartItems.reduce((a,c) =>  a +c.price * c.count, 0)
                    )}
              </div>
              <button className="btn" onClick={() => { this.setState({ showCheckout: true });
                    }} >Comprar</button>
            </div>
          </div>
          {this.state.showCheckout && (
            <Fade right cascade>
              <div className="cart">
                <form onSubmit={this.createOrder}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="">Email:</label>
                      <input type="email" required onChange={this.handleInput}placeholder="Digite seu email" name="email" id=""/>
                    </li>

                    <li>
                      <label htmlFor="">Nome:</label>
                      <input type="text" required onChange={this.handleInput} placeholder="Digite seu nome"name="name" id=""/>
                    </li>

                    <li>
                      <label htmlFor="">Endereço:</label>
                      <input type="text" required onChange={this.handleInput} placeholder="Digite seu endereço" name="address" id=""/>
                    </li>

                    <li>
                      <button className="btn" type="submit">Confirmar compra</button>
                    </li>
                    
                  </ul>
                </form>
              </div>
            </Fade>
          )}
          </div>
        )}
        </div>
      </div> 
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);