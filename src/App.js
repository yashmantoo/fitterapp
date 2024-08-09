import './App.css';
import { Signup } from './Components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './pages/Home';

function App() {
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/signup' element ={<Signup/>}/>
          <Route path='/login' element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )


}

export default App;

