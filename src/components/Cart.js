import React, { Component } from 'react';
import formatCurrency from '../utils'
import Fade from 'react-reveal/Fade';

export default class Cart extends Component{
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
      cartItems: this.state.cartItems,
    };
    this.props.createOrder(order);
  }
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