import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <>
      <div className="w-full bg-white dark:bg-black">
        <div className="max-w-7xl w-11/12 mx-auto px-4 pt-4 flex flex-col">
          <Navbar />
          <Home />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
