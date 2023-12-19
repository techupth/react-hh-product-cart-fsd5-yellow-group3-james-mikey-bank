function CartItem(props) {
  const { name, price, id, quantity, handleQuantityChange, handleDeletion } =
    props;
  return (
    <div className="cart-item">
      <h1>Item name: {name}</h1>
      <h2>Price: {price} Baht</h2>
      <h2>Quantity: {quantity}</h2>
      <button className="delete-button" onClick={() => handleDeletion(id)}>
        x
      </button>
      <div className="quantity-actions">
        <button
          className="add-quantity"
          onClick={() => handleQuantityChange(id, "add")}
        >
          +
        </button>
        <button
          className="subtract-quantity"
          onClick={() => handleQuantityChange(id, "remove")}
        >
          -
        </button>
      </div>
    </div>
  );
}
export default CartItem;
