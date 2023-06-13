import { selectCategories } from '../store/categories/categories-selector';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectProducts } from '../store/products/products-selector';
import { MouseEvent } from 'react';
import { Product } from '../Routes/Home';
import { setFilteredProducts } from '../store/products/products-reducer';
import { selectActive } from '../store/searchField/search-selector';
import { setActive } from '../store/searchField/search-field-reducer';

const Categories = () => {
  //selectors
  const active = useAppSelector(selectActive);
  const categories = useAppSelector(selectCategories);
  const productsArr = useAppSelector(selectProducts);

  const dispatch = useAppDispatch();

  const allHandler = (): void => {
    dispatch(setFilteredProducts(productsArr));
    dispatch(setActive('All'));
  };

  const onClickHandler = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void => {
    const cat = productsArr.filter(
      (product: Product): boolean =>
        product.category.toLowerCase() ===
        (event.target as HTMLButtonElement).textContent
    );
    dispatch(setFilteredProducts(cat));
  };

  return (
    <div className=" flex flex-wrap gap-4 mt-5">
      <button
        className={`btn ${
          active === 'All' ? 'bg-black text-white' : ' text-black'
        }`}
        onClick={allHandler}
      >
        All
      </button>
      {categories.map((cat: string) => (
        <button
          key={cat}
          className={`btn ${
            active === cat ? 'bg-black text-white' : ' text-black'
          }`}
          onClick={event => {
            onClickHandler(event);
            dispatch(setActive(cat));
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories;
