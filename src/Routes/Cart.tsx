import { useState } from 'react';
import CartItem from '../components/CartItem';
import {
  selectCartItems,
  selectTotal,
} from '../store/products/products-selector';
import { useAppSelector } from '../store/store';
import { Product } from './Home';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectTotal);
  const nav = useNavigate();

  if (!cartItems.length)
    return (
      <div className="flex flex-col gap-4 h-screen items-center justify-center mt-[-80px]">
        <h1 className=" text-2xl md:text-5xl font-bold">
          Your Cart Is Empty!!
        </h1>
        <button
          className="btn bg-black text-white font-bold"
          onClick={() => nav('/')}
        >
          Fill It
        </button>
      </div>
    );

  return (
    <>
      <div className=" mt-5">
        {cartItems.map((cart: Product) => (
          <CartItem key={cart?.id} cart={cart} />
        ))}
      </div>
      <div className=" flex font-bold text-2xl justify-around mt-5 md:mt-0">
        <h1>total :</h1>
        <h1 className="">${total}</h1>
      </div>
    </>
  );
};

export default Cart;
