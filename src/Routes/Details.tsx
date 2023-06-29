import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/getData';
import { Product } from './Home';
import FadeLoader from 'react-spinners/FadeLoader';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectIsLoading } from '../store/products/products-selector';
import {
  addItemToCart,
  setIsLoading,
} from '../store/products/products-reducer';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(setIsLoading(true));
      const productDetail = await getData<Product>(
        `https://dummyjson.com/products/${id}`
      );
      setProduct(productDetail);
      setImages(productDetail?.images);
      dispatch(setIsLoading(false));
    };
    fetchDetails();
  }, [id]);

  const handleClick = (index: number) => {
    setIndex(index);
    setActive(index);
  };

  if (isLoading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <FadeLoader color="#505453" height={20} />
      </div>
    );

  return (
    <>
      <div className=" px-7 md:p-0 md:flex h-screen items-center justify-around md:mt-[-100px] ">
        <div className=" md:w-[700px]">
          <img
            src={images[index]}
            className=" w-[500px] h-[300px] md:border-2 md:p-10 md:my-0 mt-10 mb-12 my rounded-md object-contain"
          />
        </div>
        <div>
          <h1 className=" font-bold text-2xl md:text-4xl mb-2 mt-[-30px] md:mt-0">
            {product?.title} ({product?.brand})
          </h1>
          <p className="text-sm md:text-[16px]">{product?.description}</p>
          <div className=" flex gap-1 md:gap-3 mt-5 md:w-[800px] overflow-x-auto">
            {images.map((img, i) => (
              <img
                onClick={() => handleClick(i)}
                src={img}
                className={`md:h-[120px] h-[70px] border md:border-2 rounded-md cursor-pointer ${
                  active === i
                    ? ' border-yellow-400 border-[2px] md:border-[3px]'
                    : 'bottom-0'
                }`}
              />
            ))}
          </div>
          <div className=" font-bold mt-6 flex items-center justify-between">
            <div>
              <div className="flex">
                <div className=" w-[80px]">discount : </div>
                <p> ${product?.discountPercentage}</p>
              </div>
            </div>
            <div className=" border ">
              <button
                className=" btn addToCart"
                onClick={() => product && dispatch(addItemToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
