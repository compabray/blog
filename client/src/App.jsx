import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';


//import pages
import SingleBlog from './pages/SingleBlog';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      <Navbar/>
      <div className='flex-grow mt-24'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route
          path='/blog/:path'
          element={<SingleBlog/>}
        />

        <Route
          path='/create'
          element={<CreateBlog/>}
        />
        <Route
          path='/login'
          element={<Login/>}
        />

        <Route 
          path='/admin'
          element={<Admin/>}
        />
      </Routes>
      </div>
    </div>
  );
}

export default App;
