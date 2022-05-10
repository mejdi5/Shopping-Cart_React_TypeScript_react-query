import {useState} from 'react';
import { useQuery } from 'react-query';
import axios from 'axios'
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import SingleItem from './components/SingleItem'
import Cart from './components/Cart/Cart'


export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;

export interface Item {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async () => 
  await axios
  .get('https://fakestoreapi.com/products', {
    headers: {"Content-Type": "application/json", Accept: "application/json"}
  })
  .then(res => res.data)
  .catch(err => console.log(err.message))


function App() {

  const { data, isLoading, error} = useQuery<Item[]>('products', getProducts)

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Item[]>([])

  const handleAdd = (chosenItem: Item) => {
    //chosen item is not in cart
    if (!cartItems.some(item => item.id === chosenItem.id)) {
      setCartItems([...cartItems, {...chosenItem, amount: 1}])
    } 
    //chosen item is in cart
    else {
      setCartItems(cartItems.map(item => 
        item.id === chosenItem.id 
        ? {...item, amount: item.amount + 1}
        : item
    ))
    }
  } 

  const handleRemove = (id: number) => {
    setCartItems(
      cartItems
      .filter(item => !(item.id === id && item.amount === 1))
      .map(item => item.id === id 
      ? { ...item, amount: item.amount - 1 }
      : item
      ))
  }

  const getTotalItems = (items: Item[]) => 
  items.reduce((acc: number, item) => acc + item.amount, 0);

  if (isLoading) return <LinearProgress/>
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <h1 style={{textAlign:'center', fontWeight:'bold'}}>Shopping Cart</h1>
      <Drawer open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
        cartItems={cartItems} 
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        />
      </Drawer>
      <div style={{marginBottom:'40px', textAlign:'center'}}>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      </div>
      <Grid container spacing={3}>
      {data?.map((item, index) => 
      <Grid item key={index} xs={12} sm={4}>
        <SingleItem 
        item={item} 
        handleAdd={handleAdd}
        />
      </Grid>
      )}
      </Grid>
    </Wrapper>
  );
}

export default App;
