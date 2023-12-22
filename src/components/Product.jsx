export default function Product(props) {
  return (
    <div className="product">
      <img src={props.img} alt="sample name" />
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
      <button onClick={() => props.addToCart(props.id)}>Add to cart</button>
    </div>
  );
}
