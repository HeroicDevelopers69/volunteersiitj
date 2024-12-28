import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';


function App() {
  return (
    <>
      <div className="w-full">
        <div className="max-w-7xl w-11/12 mx-auto px-4 py-4 flex flex-col">
          <Navbar />
          <Home />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
