import React from 'react'
import styled from 'styled-components';
import CartItem from './CartItem'
import { Item } from '../../App'

const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;
`;

interface Props {
    cartItems: Item[];
    handleAdd: (chosenItem: Item) => void;
    handleRemove: (id: number) => void;
}


const Cart : React.FC<Props> = ({cartItems, handleAdd, handleRemove}) => {

    const total = (items: Item[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

    return (
    <Wrapper>
        {cartItems.length === 0 
        ? <p>Cart is empty</p>
        : null}
        {cartItems.map(item => (
            <CartItem 
            key={item.id}
            item={item} 
            handleAdd={handleAdd}
            handleRemove={handleRemove} 
            />
        ))}
        <h2>Total: ${total(cartItems).toFixed(3)}</h2>
    </Wrapper>
  )
}

export default Cart