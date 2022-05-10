import React from 'react'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Item } from '../../App'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  div {
    flex: 1;
  }
  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;

interface Props {
    item: Item;
    handleAdd: (chosenItem: Item) => void;
    handleRemove: (id: number) => void
}

const CartItem : React.FC<Props> = ({item, handleAdd, handleRemove}) => {
return (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>

            <div className='information'>
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(3)}</p>
            </div>

            <div className='buttons'>

                <Button
                size='small'
                disableElevation
                variant='contained'
                onClick={() => handleRemove(item.id)}>-</Button>

                <p>{item.amount}</p>

                <Button
                size='small'
                disableElevation
                variant='contained'
                onClick={() => handleAdd(item)}>+</Button>

            </div>
        </div>

        <img src={item.image} alt={item.id.toString()}/>
    </Wrapper>
)
}

export default CartItem