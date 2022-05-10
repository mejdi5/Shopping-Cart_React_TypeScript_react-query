import React from 'react'
import { Item } from '../App'
import Button from '@material-ui/core/Button'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  
  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }
  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
    text-align: justify
  }
`;

type Props = {
    item: Item;
    handleAdd: (chosenItem: Item) => void
}

const SingleItem: React.FC<Props> = ({item, handleAdd} : Props) => {

  return (
    <Wrapper>
        <img src={item.image} alt={item.id.toString()} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price.toFixed(3)}</h3>
        </div>
        <Button onClick={() => handleAdd(item)}>Add to cart</Button>
    </Wrapper>
  )
}

export default SingleItem