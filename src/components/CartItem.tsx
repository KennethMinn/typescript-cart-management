import { GrLinkPrevious } from 'react-icons/gr';
import { GrLinkNext } from 'react-icons/gr';
import { VscTrash } from 'react-icons/vsc';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
  setIsPhone,
  setScreenSize,
} from '../store/products/products-reducer';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Product } from '../Routes/Home';
import { useState, useEffect } from 'react';
import {
  selectIsPhone,
  selectScreenSize,
} from '../store/products/products-selector';

interface cartProps {
  cart: Product;
}

const CartItem = ({ cart }: cartProps) => {
  const screenSize = useAppSelector(selectScreenSize);
  const isPhone = useAppSelector(selectIsPhone);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 700) {
      dispatch(setIsPhone(true));
    } else {
      dispatch(setIsPhone(false));
    }
  }, [screenSize]);

  const { price, title, thumbnail, quantity } = cart;

  if (isPhone)
    return (
      <div className=" flex justify-center">
        <div className=" border p-5">
          <img src={thumbnail} />
          <div className="flex justify-between font-bold text-lg mt-3 mb-5">
            <h1>{title}</h1>
            <h1>${price}</h1>
          </div>
          <div className=" flex justify-between">
            <div className=" flex items-center">
              <div
                className="border px-2 flex justify-center me-5 cursor-pointer py-1 text-2xl"
                onClick={() => dispatch(decreaseQuantity(cart))}
              >
                <GrLinkPrevious />
              </div>
              <span className=" ">{quantity}</span>
              <div
                className=" border px-2 flex justify-center ms-5 cursor-pointer py-1 text-2xl"
                onClick={() => dispatch(increaseQuantity(cart))}
              >
                <GrLinkNext />
              </div>
            </div>
            <div
              className=" text-4xl text-red-600 cursor-pointer"
              onClick={() => dispatch(removeItemFromCart(cart))}
            >
              <VscTrash />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className=" mb-3 mt-5 border-b pb-4 w-[1200px] flex justify-between items-center mx-auto">
      <div className=" ">
        <img src={thumbnail} className=" w-[200px]" />
      </div>
      <div className="w-[250px]">
        <h1 className=" font-bold text-2xl">{title}</h1>
        <p className="font-bold text-lg mb-10 mt-3">${price}</p>
        <div className=" flex items-center">
          <div
            className="border px-2 flex justify-center me-5 cursor-pointer py-1"
            onClick={() => dispatch(decreaseQuantity(cart))}
          >
            <GrLinkPrevious />
          </div>
          <span className=" ">{quantity}</span>
          <div
            className=" border px-2 flex justify-center ms-5 cursor-pointer py-1"
            onClick={() => dispatch(increaseQuantity(cart))}
          >
            <GrLinkNext />
          </div>
        </div>
      </div>
      <div
        className=" text-4xl text-red-600 cursor-pointer"
        onClick={() => dispatch(removeItemFromCart(cart))}
      >
        <VscTrash />
      </div>
    </div>
  );
};

export default CartItem;
