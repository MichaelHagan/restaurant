import { Navbar } from './components';
import Category from './components/category/Category';
import Header from './components/header/Header';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Contact from './components/contact/Contact';


function App() {
  return (
    <div >
      <Navbar />
      <Header />
      <Category />
      <About />
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
