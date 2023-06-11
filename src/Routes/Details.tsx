import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/getData';
import { Product } from './Home';
import Paginations from '../components/Paginations';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isScrollable, setIsScrollable] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);

  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPost = images.slice(firstIndex, lastIndex);

  useEffect(() => {
    const fetchDetails = async () => {
      const productDetail = await getData<Product>(
        `https://dummyjson.com/products/${id}`
      );
      setProduct(productDetail);
      setImages(productDetail?.images);
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
    console.log(isScrollable);
  }, [screenSize]);

  return (
    <>
      <div className=" md:flex mt-10 justify-around ">
        <div>
          <img src={product?.thumbnail} className=" w-[300px]" />
        </div>
        <div>
          <h1 className=" font-bold text-4xl mb-2 mt-5 md:mt-0">
            {product?.title} ({product?.brand})
          </h1>
          <p>{product?.description}</p>
        </div>
      </div>
      {isScrollable === true ? (
        <div className="wrapper gap-3 mt-10">
          {product?.images.map((img, i) => (
            <div className="item" key={i}>
              <img className="h-[100px]  md:h-[200px]" src={img} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div>
            {currentPost.map((img, i) => (
              <div className="" key={i}>
                <img className="h-[100px]  md:h-[200px]" src={img} />
              </div>
            ))}
          </div>
          <Paginations
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            images={images}
          />
        </>
      )}
    </>
  );
};

export default Details;
