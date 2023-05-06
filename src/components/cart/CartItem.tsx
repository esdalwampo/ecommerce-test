import { formatPrice } from "../../helper/formatter";
import { CartItem } from "../../interfaces/types";
import Trashbin from "../../svg/Trashbin";

interface Props {
  cartItem: CartItem;
  increaseQty: any;
  decreaseQty: any;
  removeItem: any;
}

const CartListItem = (props: Props) => {

  const product = props.cartItem.product;
  const subTotal = product.unitPrice * props.cartItem.quantity;

  return (
    <div className="flex bg-base-100 my-4 p-4 mx-4 gap-4 rounded relative border-b border-dashed">
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="h-16 w-16 object-contain bg-white"
      />
      <div className="flex-1 h-16">
        <h5 className="font-semibold text-sm">{product.productName}</h5>
        <div className="w-full text-secondary font-semibold mt-1">
          {formatPrice(subTotal)}
        </div>
      </div>
      <div className="w-24 h-16">
        <div className="flex justify-center text-center items-center mt-4">
          <button 
            className="border w-6 h-6 disabled:text-gray-300" 
            onClick={() => props.decreaseQty(props.cartItem)}
            disabled={props.cartItem.quantity === 1}
          >
            -
          </button>
          <div className="flex-1 p-0 bg-gray-200">
            {props.cartItem.quantity}
          </div>
          <button 
            className="border w-6 h-6" 
            onClick={() => props.increaseQty(props.cartItem)}
          >
            +
          </button>
          <button
            className="rounded-full absolute -top-2 right-2 p-[0.4rem] cursor-pointer"
            onClick={() => props.removeItem(props.cartItem)}
          >
            <Trashbin 
              className="text-red-500"
              size={16}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartListItem;