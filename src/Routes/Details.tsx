import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/getData';
import { Product } from './Home';
import Paginations from '../components/Paginations';
import FadeLoader from 'react-spinners/FadeLoader';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectIsLoading } from '../store/products/products-selector';
import { setIsLoading } from '../store/products/products-reducer';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isScrollable, setIsScrollable] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPost = images.slice(firstIndex, lastIndex);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(setIsLoading(true));
      const productDetail = await getData<Product>(
        `https://dummyjson.com/products/${id}`
      );
      setProduct(productDetail);
      setImages(productDetail?.images);
      dispatch(setIsLoading(false));
      console.log(productDetail);
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 700) {
      setIsScrollable(false);
    } else setIsScrollable(true);
  }, [screenSize]);

  if (isLoading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <FadeLoader color="#505453" height={20} />
      </div>
    );

  return (
    <>
      <div className=" md:flex md:flex-row flex flex-col items-center text-center md:text-start mt-10 md:justify-around ">
        <div>
          <img src={product?.thumbnail} className=" w-[300px]" />
        </div>
        <div>
          <h1 className=" font-bold text-2xl md:text-4xl mb-2 mt-5 md:mt-0">
            {product?.title} ({product?.brand})
          </h1>
          <p className="text-sm md:text-[16px]">{product?.description}</p>
          <div className=" font-bold mt-4 flex items-center justify-between">
            <div>
              <div className="flex">
                <div>discount : </div>
                <p> ${product?.discountPercentage}</p>
              </div>
              <div className="flex">
                <div>price : </div>
                <p> ${product?.price}</p>
              </div>
              <div className="flex">
                <div>rate : </div>
                <p> ${product?.rating}</p>
              </div>
            </div>
            <div className=" border ">
              <button className=" btn addToCart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      {isScrollable ? (
        <div className="border-[20px] overflow-x-scroll p-4 shadow flex justify-center gap-3 mt-20">
          {product?.images.map((img, i) => (
            <div className="border p-4" key={i}>
              <img
                className="h-[100px] object-contain  md:h-[200px]"
                src={img}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className=" flex justify-center flex-col items-center border-[10px] mt-5 p-10">
          <div className=" mb-6 border p-5 shadow">
            {currentPost.map((img, i) => (
              <div className="" key={i}>
                <img className="h-[100px] md:h-[200px] mb-3" src={img} />
              </div>
            ))}
          </div>
          <Paginations
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            images={images}
          />
        </div>
      )}
    </>
  );
};

export default Details;
