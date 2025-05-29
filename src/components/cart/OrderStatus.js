import axios from "axios";
import { orderAction } from "../../store/OrderSlice";
import { useSelector, useDispatch } from "react-redux";
import classes from "./OrderStatus.module.css";
import { useEffect } from "react";

const OrderStatus = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const userEmail = useSelector((state) => state.auth.email);

  console.log(orders);
  useEffect(() => {
    getData();  // when component mount for the first time  
    const interval = setInterval(() => {
      getData();  // after every 5 seconds
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function getData() {
    try {
      const response = await axios.get(`https://restaurant-user-panel-default-rtdb.firebaseio.com/orders/${userEmail}.json`);
      if (response.data) {
        const formattedOrders = Object.keys(response.data).map((orderId) => ({
          id: orderId,
          ...response.data[orderId],
        }));
        dispatch(orderAction.updateOrderStatus(formattedOrders));
      } else {
        dispatch(orderAction.clearOrders());
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className={classes.orderStatusContainer}>
      <h1>Order Status</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul className={classes.orderList}>
          {/* {(Array.isArray(orders) ? orders : []).map((order) => ( */}
          {orders.map((orderObj)=>{
              const orderList = Object.values(orderObj).filter(value => typeof value === 'object');
               
            
             return orderList.map((order)=>(
            <li key={order.id} className={classes.orderItem}>
              
              <h3>Order ID: {order.id}</h3>
              <p>Delivery Address: {order.address}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Status: <strong>{order.status}</strong></p>
              <ul>
                {order.items?.map((item) => (
                  <li key={item.id}>
                    {item.recipeName} - {item.quantity} x ${item.price} = ${item.totalPrice}
                  </li>
                ))}
              </ul>
            </li>
             )); 
           })}
        </ul>
      )}
    </div>
  );
};

export default OrderStatus;
