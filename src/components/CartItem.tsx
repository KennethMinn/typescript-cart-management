import { GrLinkPrevious } from 'react-icons/gr';
import { GrLinkNext } from 'react-icons/gr';
import { VscTrash } from 'react-icons/vsc';
import { removeItemFromCart } from '../store/products/products-reducer';
import { useAppDispatch } from '../store/store';
import { Product } from '../Routes/Home';
import { useState, useEffect } from 'react';

interface cartProps {
  cart: Product;
  calcIncrement: (n: number) => void;
  calcDecrement: (n: number) => void;
}

const CartItem = ({ cart, calcDecrement, calcIncrement }: cartProps) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isPhone, setIsPhone] = useState(true);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 700) {
      setIsPhone(true);
    } else setIsPhone(false);
  }, [screenSize]);

  const dispatch = useAppDispatch();
  const { price, title, thumbnail } = cart;

  const [count, setCount] = useState(1);

  const prevHandler = () => {
    setCount(prev => prev - 1);
    calcDecrement(price);
    console.log(count);
    if (count === 1) dispatch(removeItemFromCart(cart));
  };

  const nextHandler = () => {
    if (count >= 1) {
      setCount(prev => prev + 1);
      calcIncrement(price);
    }
  };

  const oneItemPrice = price * count;

  const delBtn = () => {
    dispatch(removeItemFromCart(cart));
    calcDecrement(oneItemPrice);
  };

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
                onClick={prevHandler}
              >
                <GrLinkPrevious />
              </div>
              <span className=" ">{count}</span>
              <div
                className=" border px-2 flex justify-center ms-5 cursor-pointer py-1 text-2xl"
                onClick={nextHandler}
              >
                <GrLinkNext />
              </div>
            </div>
            <div
              className=" text-4xl text-red-600 cursor-pointer"
              onClick={delBtn}
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
            onClick={prevHandler}
          >
            <GrLinkPrevious />
          </div>
          <span className=" ">{count}</span>
          <div
            className=" border px-2 flex justify-center ms-5 cursor-pointer py-1"
            onClick={nextHandler}
          >
            <GrLinkNext />
          </div>
        </div>
      </div>
      <div className=" text-4xl text-red-600 cursor-pointer" onClick={delBtn}>
        <VscTrash />
      </div>
    </div>
  );
};

export default CartItem;
