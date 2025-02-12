import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Cart.module.css";
import { cartAction } from "../../store/CartSlice";
import { orderAction } from "../../store/OrderSlice"; // Importing order actions

const Cart = () => {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart.cartData);

    const [showCheckout, setShowCheckout] = useState(false);
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (cartData.length === 0) {
            setShowCheckout(false);
        }
    }, [cartData]);

    useEffect(()=>{
        const storedCart = localStorage.getItem("cartData");
        if (storedCart) {
            dispatch(cartAction.setCartFromLocalStorage(JSON.parse(storedCart)));
        }
    },[dispatch])
    
    useEffect(() => {
        if (cartData.length > 0) {
            localStorage.setItem("cartData", JSON.stringify(cartData));
        }
    }, [cartData]);



    const removeItemHandler = (id) => {
        dispatch(cartAction.removeToCart(id));
    };

    const addItemHandler = (item) => {
      
        dispatch(cartAction.addToCart(item));
    };

    const placeOrderHandler = () => {
        setShowCheckout(true);
    };

    const confirmOrderHandler = () => {
        if (address.trim() === "") {
            alert("Please enter your delivery address.");
            return;
        }

        const order = {
            id: new Date().getTime(),
            items: cartData,
            address,
            paymentMethod: "COD",
            status: "Pending",
        };

        dispatch(orderAction.addOrder(order));
        dispatch(cartAction.clearCart());
        setShowCheckout(false);
        alert("🎉 Order Placed Successfully!");
    };

    return (
        <Fragment>
            <div className={classes.cartHeader}>
                <h1>Cart</h1>
            </div>

            {cartData.length === 0 ? (
                <p className={classes.emptyCartMessage}>Please Add a Recipe</p>
            ) : (
                <ul className={classes.cartList}>
                    {cartData.map((item) => (
                        <li key={item.id} className={classes.cartItem}>
                            <div className={classes.itemDetails}>
                                <img src={item.image} alt={item.recipeName} />
                                <div className={classes.itemInfo}>
                                    <h3>{item.recipeName}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Total: ${item.totalPrice}</p>
                                </div>
                            </div>
                            <div className={classes.quantityControls}>
                                <button onClick={() => removeItemHandler(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => addItemHandler(item)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cartData.length > 0 && (
                <div className={classes.placeOrderContainer}>
                    <button onClick={placeOrderHandler}>Place Order</button>
                </div>
            )}

            {/* modal for check out */}
            {showCheckout && (
                <div className={classes.checkoutModal}>
                    <h2>Checkout</h2>
                    <div>
                        <h3>Order Summary:</h3>
                        <ul>
                            {cartData.map((item) => (
                                <li key={item.id}>
                                    {item.recipeName} - {item.quantity} x ${item.price} = ${item.totalPrice}
                                </li>
                            ))}
                        </ul>
                        <p>
                            <strong>
                                Total Amount: $
                                {cartData.reduce((acc, item) => acc + item.totalPrice, 0)}
                            </strong>
                        </p>
                    </div>

                    <div>
                        <label>Delivery Address:</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your delivery address"
                            rows="3"
                        ></textarea>
                    </div>

                    <div>
                        <p>
                            <strong>Payment Method:</strong> Cash on Delivery (COD)
                        </p>
                    </div>

                    <div className={classes.checkoutButtons}>
                        <button onClick={confirmOrderHandler}>Confirm Order</button>
                        <button onClick={() => setShowCheckout(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Cart;
