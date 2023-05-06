import { useState } from 'react';
import { CartItem } from '../../interfaces/types';
import CartListItem from './CartItem';
import { formatPrice } from '../../helper/formatter';
import MessageModal from '../modal/MessageModal';
import Trashbin from '../../svg/Trashbin';

interface Props {
  cartItems: CartItem[];
  setCartItems: any;
}

const Cart = (props: Props) => {

  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const cartItems = props.cartItems;
  const totalPrice = cartItems.reduce((res, item) => (
    res + (item.product.unitPrice * item.quantity)
  ), 0);
  const totalItems = cartItems.reduce((res, item) => (
    res + item.quantity
  ), 0);

  const increaseQty = (selected: CartItem) => {
    let qty = selected.quantity + 1;
    let items = [...cartItems];
    for (let item of items) {
      if (item.product.id === selected.product.id) {
        item.quantity = qty;
        break;
      }
    }
    props.setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  const decreaseQty = (selected: CartItem) => {
    let qty = selected.quantity - 1;
    let items = [...cartItems];
    for (let item of items) {
      if (item.product.id === selected.product.id) {
        item.quantity = qty;
        break;
      }
    }
    props.setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  const removeItem = (selected: CartItem) => {
    let items = [...cartItems];
    let index = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i].product.id === selected.product.id) {
        index = i;
        break;
      }
    }

    items.splice(index, 1);
    props.setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  const clearCart = () => {
    props.setCartItems([]);
    localStorage.removeItem("cartItems");
  }

  const checkout = () => {

    if(cartItems.length > 0) {
      clearCart();
      setModal(true);
    }
  }

  return (

    <>
      <MessageModal
        isOpen={modal}
        setIsOpen={setModal}
      />
      <input type='checkbox' id='view-cart' className='hidden'
        checked={isOpen}
        onChange={e => setIsOpen(e.target.checked)}
      />
      <aside className={
        "fixed w-[24rem] pt-[5rem] h-full top-0 right-0 text-accent lg:block drop-shadow-lg lg:drop-shadow-none " + (
          isOpen ? "" : "hidden"
        )
      }>
        <div className="h-full relative">
          <div className="h-full border-l-2 ">
            <div className="fixed h-20 mt-[5rem] w-[24rem] top-0  bg-white flex">
              <div className='py-4 px-3 text-accent font-bold uppercase text-lg flex-1'>
                My Cart
              </div>
              <button 
                className="text-red-500 px-2 py-2 rounded mt-2 flex items-center"
                onClick={clearCart}
              >
                <Trashbin />
                <span>Clear Cart</span>
              </button>
            </div>

            <div className="h-full pt-20 pb-40 bg-gray-100">
              <div className='h-full overflow-y-auto overflow-x-hidden'>
                {
                  cartItems.map((item: CartItem, index: number) => (
                    <CartListItem
                      key={item.product.id}
                      cartItem={item}
                      increaseQty={increaseQty}
                      decreaseQty={decreaseQty}
                      removeItem={removeItem}
                    />
                  ))
                }
              </div>
            </div>

            <div className="h-40 fixed bottom-0 w-[24rem] flex flex-col p-4 bg-white drop-shadow-lg z-10">
              <div className='flex-1'>
                <div className='flex'>
                  <span className='font-semibold'>Total Items:</span>
                  <span className='text-secondary ml-2 font-bold flex-1 text-right'>{totalItems}</span>
                </div>
                <div className='flex items-end mt-2 pt-2 border-t border-accent border-dotted'>
                  <span className='font-semibold'>Total Price:</span>
                  <span className='text-secondary ml-2 font-extrabold flex-1 text-right text-xl'>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <button 
                className="text-primary-content bg-primary px-2 py-2 rounded mt-2 disabled:bg-gray-200"
                disabled={cartItems.length === 0}
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Cart;