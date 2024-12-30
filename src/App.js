import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import AdvertiserDashboard from './pages/advertiserDashboard'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className='w-full bg-gray-200 dark:bg-black'>
        <div className="max-w-7xl w-11/12 mx-auto px-4 pt-4 flex flex-col">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/advertiserDashboard' element={<AdvertiserDashboard />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
