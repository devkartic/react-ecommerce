import React, {useState} from 'react'
import styled from "styled-components";
import {FaCheck} from 'react-icons/fa'
import CartAmountToggle from './CartAmountToggle';
import { NavLink } from 'react-router-dom';
import {Button} from './../styles/Button';
import {useCartContext} from './../context/CartContext';

const AddToCart = ({product}) => {
    const {id, colors, stock} = product;
    const [color, setColor] = useState(colors[0]);
    const [amount, setAmount] = useState(1);
    const {addToCart} = useCartContext();

    const setIncrease = () => {
      amount < stock ? setAmount(amount + 1): setAmount(stock)
    }
    const setDecrease = () => {
      amount > 1 ? setAmount(amount - 1): setAmount(1)
    }

    return (
        <Wrapper>
            <div className='colors'>
                <p>
                    Colors:
                    {
                        colors.map((currentColor, index) => {
                            return <button key={index} style={{background: currentColor}}
                                           className={color === currentColor ? 'btnStyle active' : 'btnStyle'}
                                           onClick={() => setColor(currentColor)}>{color === currentColor ?
                                <FaCheck className="checkStyle"/> : null}</button>;
                        })
                    }
                </p>
            </div>
            {/* Add to Cart */}
            <CartAmountToggle amount={amount} setIncrease={()=>setIncrease()} setDecrease={()=>setDecrease()} />

            <NavLink to={'/cart'}>
                <Button className="btn" onClick={()=>addToCart(id, color, amount, product)}>ADD TO CART</Button>
            </NavLink>

        </Wrapper>
    )
}

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */

  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({theme}) => theme.colors.btn};
    }
  }
`;

export default AddToCart