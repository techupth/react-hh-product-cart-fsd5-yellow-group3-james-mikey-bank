import { useState, useEffect } from "react";
import "./App.css";
import Product from "./components/Product";
import productsData from "./data/products";
import CartItem from "./components/CartItem";

function App() {
  const [cart, setCart] = useState({});
  console.log("App:", cart);
  const [cartTotal, setCartTotal] = useState(0);
  console.log("App", cartTotal);

  useEffect(() => {
    calculateCartTotal();
  }, [cart]);

  function handleAddToCart(productId) {
    setCart((prevCart) => {
      if (prevCart[productId]) {
        return {
          ...prevCart,
          [productId]: {
            ...prevCart[productId],
            quantity: prevCart[productId].quantity + 1,
          },
        };
      } else {
        return {
          ...prevCart,
          [productId]: {
            id: productId,
            price: productsData[productId - 1].price,
            name: productsData[productId - 1].name,
            quantity: 1,
          },
        };
      }
    });
  }

  function handleQuantityChange(productId, action) {
    setCart((prevCart) => {
      if (prevCart[productId]) {
        if (action === "add") {
          return {
            ...prevCart,
            [productId]: {
              ...prevCart[productId],
              quantity: prevCart[productId].quantity + 1,
            },
          };
        } else if (action === "remove") {
          if (prevCart[productId].quantity === 1) {
            deleteCartItem(productId);
          }
          return {
            ...prevCart,
            [productId]: {
              ...prevCart[productId],
              quantity: prevCart[productId].quantity - 1,
            },
          };
        }
      }
      return prevCart;
    });
  }

  function calculateCartTotal() {
    const cartTotal = Object.values(cart).reduce((acc, cartItem) => {
      acc += cartItem.price * cartItem.quantity;
      return acc;
    }, 0);
    setCartTotal(cartTotal);
  }

  function deleteCartItem(productId) {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  }

  const cartItems = Object.values(cart).map((cartItemData) => {
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
  });

  return (
    <div
      className="App"
      style={{
        fontFamily: "sans-serif",
        fontSize: "16px",
      }}
    >
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
        <div className="cart-item-list">{cartItems}</div>
      </section>
    </div>
  );
}

export default App;
