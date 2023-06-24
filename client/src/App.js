import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

// Pages
import Home from './Pages/Home'
import CreateEdit from './Pages/CreateEdit'
import View from './Pages/View'


function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <ToastContainer position="top-center" />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateEdit />} />
          <Route path='/update/:id' element={<CreateEdit />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </BrowserRouter>    
    </div>
  );
}

export default App;
