import { useState, useEffect } from "react";
import "./App.css";
import Product from "./components/Product";
import productsData from "./data/products";
import CartItem from "./components/CartItem";

function App() {
  const [cart, setCart] = useState([]);
  console.log("App:", cart);
  const [cartTotal, setCartTotal] = useState(0);
  console.log("App", cartTotal);

  useEffect(() => {
    calculateCartTotal();
  }, [cart]);

  function handleAddToCart(productId) {
    setCart((prevCart) => {
      const newItem = {
        id: productId,
        price: productsData[productId - 1].price,
        name: productsData[productId - 1].name,
        quantity: 1,
      };
      if (prevCart.some((cartItem) => cartItem.id === productId)) {
        return prevCart.map((cartItem) => {
          if (cartItem.id === productId) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        // add a new cart item if product has never been added.
      } else {
        return [...prevCart, newItem];
      }
    });
  }

  function handleQuantityChange(productId, action) {
    setCart((prevCart) => {
      console.log("Before mapping", prevCart);
      // Error: suspected perp.
      const nextCart = prevCart.map((cartItem) => {
        console.log("handleQuantityChange", cartItem);
        if (cartItem.id === productId) {
          if (action === "add") {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          } else if (action === "remove") {
            if (cartItem.quantity === 1) {
              deleteCartItem(productId);
            }
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
        }
        // return all other CartItem(s) without changes
        return { ...cartItem };
      });
      console.log("After mapping", nextCart);
      return nextCart;
    });
  }

  function calculateCartTotal() {
    const cartTotal = cart.reduce((acc, cartItem) => {
      acc += cartItem.price * cartItem.quantity;
      return acc;
    }, 0);
    setCartTotal(cartTotal);
  }

  function deleteCartItem(productId) {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => {
        return cartItem.id !== productId;
      })
    );
    console.log("deleteCartItem", "after filter", cart);
  }

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {productsData.map((productData) => {
            return (
              <Product
                key={productData.id}
                data={productData}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          {cartTotal === 0
            ? "You have nothing in your cart :("
            : `Cart (Total Price is ${cartTotal} Baht)`}
        </h1>
        <div className="cart-item-list">
          {cart.map((cartItemData) => {
            // Error: undefined after adding or removing
            console.log("Mapping cart item", cartItemData);
            const { id, name, quantity, price } = cartItemData;
            return (
              <CartItem
                id={id}
                key={id}
                name={name}
                quantity={quantity}
                price={price}
                handleQuantityChange={handleQuantityChange}
                handleDeletion={deleteCartItem}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
