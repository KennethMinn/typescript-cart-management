import './App.css';
import Cart from './Routes/Cart';
import Details from './Routes/Details';
import Home from './Routes/Home';
import SignIn from './Routes/SignIn';
import SignUp from './Routes/SignUp';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
