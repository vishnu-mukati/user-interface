import { useSelector } from "react-redux";
import classes from "./OrderStatus.module.css";

const OrderStatus = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <div className={classes.orderStatusContainer}>
      <h1>Order Status</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul className={classes.orderList}>
          {orders.map((order) => (
            <li key={order.id} className={classes.orderItem}>
              <h3>Order ID: {order.id}</h3>
              <p>Delivery Address: {order.address}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Status: <strong>{order.status}</strong></p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.recipeName} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderStatus;
