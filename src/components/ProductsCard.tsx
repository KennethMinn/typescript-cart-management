import FadeLoader from 'react-spinners/FadeLoader';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { Product } from '../Routes/Home';
import { cut } from '../utils/cut';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addItemToCart } from '../store/products/products-reducer';
import { useRef } from 'react';
import { selectIsAdded } from '../store/products/products-selector';

interface ProductsCardProps {
  product: Product;
}

const ProductsCard = ({ product }: ProductsCardProps) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);
  const isAdded = useAppSelector(selectIsAdded);

  return (
    <div className=" border p-5 shadow-lg w-[300px] sm:w-[400px] rounded">
      <div className=" flex justify-center">
        {product?.thumbnail ? (
          <img
            className=" w-[150px] h-[100px]"
            src={product?.thumbnail}
            alt=""
          />
        ) : (
          <FadeLoader color="#505453" height={10} width={5} />
        )}
      </div>
      <div className=" mt-5 flex justify-between">
        <h1 className=" font-bold">${product.price}</h1>
        <div className=" flex">
          {[...Array(5)].map((_: void, i: number) => {
            return Math.round(product?.rating) > i ? (
              <AiFillStar key={i} />
            ) : (
              <AiOutlineStar key={i} />
            );
          })}
        </div>
      </div>
      <div className=" font-bold text-xl truncate mt-3">{product?.title}</div>
      <div className=" mt-3 h-[50px]">{cut(product?.description)}</div>
      <div className=" flex justify-end gap-3">
        <button
          className="btn bg-black text-white mt-3 addToCart"
          onClick={() => nav(`details/${product?.id}`)}
        >
          Details
        </button>
        <button
          ref={inputRef}
          className="btn mt-3 addToCart"
          onClick={() => dispatch(addItemToCart(product))}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
