import './App.css';
import Header from './components/Header';
// import Home from './components/Home';
import Products from './components/Products';
import {Routes, Route} from 'react-router-dom'
import Cart from './components/Cart';
import About from './components/About';
import ProductDetails from './components/ProductDetails';
import Contact from './components/Contact';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/products' element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;