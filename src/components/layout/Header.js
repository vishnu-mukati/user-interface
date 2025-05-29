import React, {useState, useEffect } from 'react';
import Logo from '../../assets/logo.svg';
import { ShoppingCart, User } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { authActions } from '../../store/AuthSlice';
import { cartAction } from '../../store/CartSlice';
import OrderStatus from '../cart/OrderStatus';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userEmail = useSelector(state => state.auth.email); 
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Get cart items from Redux
  const cartItems = useSelector(state => state.cart.cartData);

  useEffect(() => {
    if (userEmail) {
      const savedCart = JSON.parse(localStorage.getItem(userEmail)) || [];
      dispatch(cartAction.replaceCart(savedCart));
    }
  }, [userEmail, dispatch]);


  // Calculate total quantity
  useEffect(()=>{
    setTotalQuantity(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  },[cartItems,userEmail])
  


    
 

  const clickHandler = () => {
    history.push("/dashboard");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(cartAction.clearCart());
  };

  const showOrdersHandler = () =>{
      history.push("/orders");
  }

  return (
    <header className={classes.header}>
      <div onClick={clickHandler} className={classes.logo}>
        <img src={Logo} alt="My Logo" style={{ height: '50px' }} />
      </div>

      <input
        type="text"
        placeholder="Search..."
        className={classes.searchInput}
      />
      <div className={classes.rightSection}>
        <div className={classes.icons}>
          <User onClick={() => history.push('/profile')} size={24} />

          <div className={classes.cartIcon} onClick={() => history.push('/cart')}>
            <ShoppingCart size={24} />
            {totalQuantity > 0 && (
              <span className={classes.cartBadge}>{totalQuantity}</span>
            )}
          </div>
        </div>
      </div>
      <div>
       <button  className={classes.orderButton} onClick={showOrdersHandler}>Orders</button>
      </div>

      <div>
        <button className={classes.logoutButton} onClick={logoutHandler}>
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
