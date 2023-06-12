import { BsCart4 } from 'react-icons/bs';
import { Outlet, useNavigate } from 'react-router-dom';
import { setSearchField } from '../store/searchField/search-field-reducer';
import { useAppDispatch, useAppSelector } from '../store/store';
import { ChangeEvent } from 'react';
import { setActive } from '../store/searchField/search-field-reducer';
import { selectCartItems } from '../store/products/products-selector';

const Navbar = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchField(event.target.value));
    dispatch(setActive('All'));
  };

  return (
    <>
      <div className=" flex mt-3 justify-around items-center border-b-2 pb-7 shadow-sm">
        <h1
          className=" font-bold text-lg sm:text-4xl cursor-pointer"
          onClick={() => nav('/')}
        >
          Navbar logo
        </h1>
        <div className="flex items-center gap-5">
          <input
            className=" w-[120px] sm:w-[250px] border-2 outline-none py-1"
            type="text"
            placeholder=" search"
            onChange={onChangeHandler}
          />
          <div
            className=" text-4xl relative cursor-pointer"
            onClick={() => nav('/cart')}
          >
            <BsCart4 />
            <span className=" top-[-3px] right-[-9px] bg-black w-[21px] h-[21px] text-white font-bold text-xs flex justify-center items-center rounded-full absolute right">
              <span>{cartItems.length < 9 ? cartItems.length : '9+'}</span>
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
