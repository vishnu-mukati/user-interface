import React from 'react';
import Logo from '../../assets/logo.svg';
import { ShoppingCart, User } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import { authActions } from '../../store/AuthSlice';
import OrderStatus from '../cart/OrderStatus';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Get cart items from Redux
  const cartItems = useSelector(state => state.cart.cartData);

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const clickHandler = () => {
    history.push("/dashboard");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const showOrdersHandler = () =>{
      history.push("/orders");
  }

  return (
    <header className={styles.header}>
      <div onClick={clickHandler} className={styles.logo}>
        <img src={Logo} alt="My Logo" style={{ height: '50px' }} />
      </div>

      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
      />
      <div className={styles.rightSection}>
        <div className={styles.icons}>
          <User onClick={() => history.push('/profile')} size={24} />

          <div className={styles.cartIcon} onClick={() => history.push('/cart')}>
            <ShoppingCart size={24} />
            {totalQuantity > 0 && (
              <span className={styles.cartBadge}>{totalQuantity}</span>
            )}
          </div>
        </div>
      </div>
      <div>
       <button onClick={showOrdersHandler}>Orders</button>
      </div>

      <div>
        <button className={styles.logoutButton} onClick={logoutHandler}>
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
