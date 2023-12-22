import { useEffect, useState } from "react";
import "./App.css";
import Product from "./components/Product";
import data from "./data/products";
import CartItem from "./components/CartItem";

function App() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(() => {
      return cart.reduce((prev, curr) => {
        return prev + curr.quantity * curr.price;
      }, 0);
    });
  }, [cart]);

  function addToCart(id) {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === id);

      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const itemInDb = data.find((item) => item.id === id);
        const newItem = { ...itemInDb, quantity: 1 };
        return [...prevCart, newItem];
      }
    });
  }

  function deleteFromCart(id) {
    setCart((prevCart) => {
      const indexOfItem = prevCart.findIndex((item) => item.id === id);

      if (indexOfItem !== -1) {
        const newCart = [...prevCart];
        newCart.splice(indexOfItem, 1);
        return newCart;
      } else {
        console.log("No Item in cart");
      }
    });
  }

  function handleQuantityUpdate(id, action) {
    if (action === "add") {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      });
    } else if (action === "delete") {
      setCart((prevCart) => {
        return prevCart.map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity - 1);
            return { ...item, quantity: newQuantity };
          } else {
            return item;
          }
        });
      });
    }
  }

  const cardsElement = cart.map((item) => (
    <CartItem
      id={item.id}
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      deleteFromCart={deleteFromCart}
      handleQuantityUpdate={handleQuantityUpdate}
    />
  ));

  const productsElement = data.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      img={product.image}
      desc={product.description}
      addToCart={addToCart}
    />
  ));

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">{productsElement}</div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is {totalPrice} Baht)
        </h1>
        <div className="cart-item-list">{cardsElement}</div>
      </section>
    </div>
  );
}

export default App;
