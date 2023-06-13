import { useEffect } from 'react';
import { getData } from '../utils/getData';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  selectProducts,
  selectIsLoading,
  selectFilteredProducts,
} from '../store/products/products-selector';
import { setProducts, setIsLoading } from '../store/products/products-reducer';
import FadeLoader from 'react-spinners/FadeLoader';
import ProductsCard from '../components/ProductsCard';
import { setFilteredProducts } from '../store/products/products-reducer';
import { selectSearchField } from '../store/searchField/search-selector';
import { setCategories } from '../store/categories/categories-reducer';
import Categories from '../components/Categories';

export interface Welcome {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const Home = () => {
  //Selectors
  const productsArr = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const searchField = useAppSelector(selectSearchField);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  //dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setIsLoading(true));
      const { products } = await getData<Welcome>(
        'https://dummyjson.com/products'
      );
      dispatch(setProducts(products));
      dispatch(setIsLoading(false));

      const newCategories = [
        ...new Set(products.map((product: Product) => product.category)),
      ];
      dispatch(setCategories(newCategories));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newFilteredMonster = productsArr.filter((product: Product) =>
      product.title.toLowerCase().includes(searchField.toLowerCase())
    );
    dispatch(setFilteredProducts(newFilteredMonster));
  }, [searchField, productsArr]);

  if (isLoading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <FadeLoader color="#505453" height={20} />
      </div>
    );

  return (
    <>
      <Categories />
      <div className=" grid grid-cols-1 md:grid-cols-3 justify-items-center mt-7 gap-y-10 gap-x-0">
        {filteredProducts.map((product: Product) => (
          <ProductsCard key={product?.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
