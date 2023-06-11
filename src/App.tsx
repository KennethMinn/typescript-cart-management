import './App.css';
import Details from './Routes/Details';
import Home from './Routes/Home';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
