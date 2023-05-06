import { formatPrice } from "../../helper/formatter";
import { CartItem, Product } from "../../interfaces/types";

interface Props {
  product: Product;
  setCartItems: any;
}

const ProductListItem = (props: Props) => {
  
  const product = props.product;

  const addToCart = (product:Product) => {
    let items = window.localStorage.getItem("cartItems");
    let cartItems:CartItem[] = items ? JSON.parse(items) : [];

    /* Check if item is already in the cart */
    let exist = false;
    for(let item of cartItems) {
      if(item.product.id === product.id) {
        item.quantity += 1;
        exist = true;
        break;
      }
    }

    if(!exist) {
      let newItem = {
        product: product,
        quantity: 1
      }
      cartItems.push(newItem);
    }

    props.setCartItems(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  return (
    <div className="flex bg-base-100 my-4 p-4 gap-4 rounded">
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="h-32 w-32 object-contain bg-white"
      />
      <div className="flex-1 h-32">
        <h5 className="font-bold">{product.productName}</h5>
        <h6>{product.category}</h6>
        <p className="text-xs h-24 overflow-hidden">
          {product.description}
        </p>
      </div>
      <div className="w-[8rem] h-32">
        <div className="flex-1 text-right w-full text-secondary font-semibold text-lg">
          {formatPrice(product.unitPrice)}
        </div>
        
        {/* <div className="flex justify-center text-center items-center mt-4">
          <button className="border w-8 h-8">-</button>
          <div className="flex-1 p-0 bg-accent">
            <input type="number" defaultValue="1" className="w-full h-full m-0 outline-none bg-transparent text-center"/>
          </div>
          <button className="border inline-block w-8 h-8">+</button>
        </div> */}

        <button 
          className="w-full py-2 px-2 bg-primary text-primary-content mt-8 text-sm font-bold rounded active:bg-primary-focus transition-colors"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductListItem;