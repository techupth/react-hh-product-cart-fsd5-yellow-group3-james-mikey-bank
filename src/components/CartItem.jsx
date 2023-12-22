export default function CartItem(props) {
  return (
    <div className="cart-item">
      <h1>{props.name}</h1>
      <h2>Price: {props.price} Baht</h2>
      <h2>Quantity: {props.quantity}</h2>
      <button
        className="delete-button"
        onClick={() => props.deleteFromCart(props.id)}
      >
        x
      </button>
      <div className="quantity-actions">
        <button
          className="add-quantity"
          onClick={() => props.handleQuantityUpdate(props.id, "add")}
        >
          +
        </button>
        <button
          className="subtract-quantity"
          onClick={() => props.handleQuantityUpdate(props.id, "delete")}
        >
          -
        </button>
      </div>
    </div>
  );
}
