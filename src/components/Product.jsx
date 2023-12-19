function Product(props) {
  const { image, name, description, id } = props.data;
  return (
    <div className="product">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <button onClick={() => props.handleAddToCart(id)}>Add to cart</button>
    </div>
  );
}
export default Product;
