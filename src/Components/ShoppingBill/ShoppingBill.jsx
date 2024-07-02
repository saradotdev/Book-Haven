import "./ShoppingBill.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, useToast, useOrders } from "../../index";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51PXR1ZRsV6zzvOP1B00VpFXmuME18rLxjL7EjMAWJqsMOVhsRDHHQpPJHzyiXg1nfySHI4dDFSWZdFw83vILydJZ00vpfwgbEN");

function ShoppingBill() {
    const navigate = useNavigate();
    const { userCart, dispatchUserCart } = useCart();
    const { showToast } = useToast();
    const { dispatchUserOrders }= useOrders();
    let totalDiscount = 0, totalBill = 0, finalBill = 0;
    const [ couponName, setCouponName ] = useState("");

    userCart.forEach(product => {
        let discountOnCurrentProduct = ( (product.originalPrice - product.discountedPrice) * product.quantity );
        totalDiscount += discountOnCurrentProduct;
        totalBill += ( product.discountedPrice * product.quantity );
    });

    if(couponName === "BOOKS200") {
        finalBill = totalBill - 200;
    } else {
        finalBill = totalBill;
    }

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        const response = await axios.post("http://localhost:4242/create-checkout-session", {
            items: userCart.map(product => ({
                price_data: {
                    currency: 'pkr',
                    product_data: {
                        name: product.bookName,
                    },
                    unit_amount: product.discountedPrice * 100,
                },
                quantity: product.quantity,
            })),
            success_url: window.location.origin + '/success',
            cancel_url: window.location.origin + '/cancel',
        });

        const session = response.data;

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            showToast("error", "", result.error.message);
        }
    };

    return (
        <div className="cart-bill">
            <h2 className="bill-heading">Bill Details</h2>
            <hr />
            {
                userCart.map(product => (
                    <div key={product._id} className="cart-price-container">
                        <div className="cart-item-bookname">
                            <p>{product.bookName}</p>
                        </div>
                        <div className="cart-item-quantity">
                            <p>X {product.quantity}</p>
                        </div>
                        <div className="cart-item-total-price" id="price-sum">
                            <p>Rs. {product.discountedPrice * product.quantity}</p>
                        </div>
                    </div>
                ))
            }
            <hr />
            <div className="cart-discount-container">
                <div className="cart-item-total-discount">
                    <p>Discount</p>
                </div>
                <div className="cart-item-total-discount-amount" id="price-sum">
                    <p>Rs. {totalDiscount}</p>
                </div>
            </div>
            <div className="cart-delivery-charges-container">
                <div className="cart-item-total-delivery-charges">
                    <p>Delivery Charges</p>
                </div>
                <div className="cart-item-total-delivery-charges-amount" id="price-sum">
                    <p id="delivery-charges">Rs. 50</p>
                </div>
            </div>
            <hr />
            <div className="cart-total-charges-container">
                <div className="cart-item-total-delivery-charges">
                    <p><b>Total Charges</b></p>
                </div>
                <div className="cart-item-total-delivery-charges-amount" id="price-sum">
                    <p id="total-charges"><b>Rs. {finalBill}</b></p>
                </div>
            </div>
            <hr />
            <div className="apply-coupon-container">
                <p>Apply Coupon</p>
                <input
                    value={couponName}
                    onChange={(event) => setCouponName(event.target.value)}
                    placeholder="Try BOOKS200"
                />
            </div>
            <button 
                className="place-order-btn solid-secondary-btn"
                onClick={handleCheckout}
            >
                Proceed to Checkout
            </button>
        </div>
    );
}

export { ShoppingBill };
