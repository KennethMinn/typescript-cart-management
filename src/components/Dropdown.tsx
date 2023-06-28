import { useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setIsDropDownOpen } from '../store/searchField/search-field-reducer';
import Cookies from 'js-cookie';

const Dropdown = () => {
  //states
  const [isLoggedIn, setIsLogIn] = useState(false);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const user = Cookies.get('user');

  //functions

  const signOutHandler = () => {
    signOut(auth);
    dispatch(setIsDropDownOpen(false));
  };

  const signInHandler = () => {
    nav('/signIn');
    dispatch(setIsDropDownOpen(false));
  };

  //subscribing user
  onAuthStateChanged(auth, user => {
    if (user) setIsLogIn(true);
    else setIsLogIn(false);
  });

  return (
    <div className="flex flex-col dropDownProfile">
      <ul className=" flex flex-col gap-4">
        <li>{isLoggedIn ? `${user}` : 'Nobody'}</li>
        <li>Setting</li>
        <hr />
        {isLoggedIn ? (
          <li onClick={signOutHandler} className=" cursor-pointer">
            sign Out
          </li>
        ) : (
          <li onClick={signInHandler} className=" cursor-pointer">
            sign In
          </li>
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
