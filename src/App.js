import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './Component/Login/login';
import Signup from './Component/Signup/signup';
import DashBoard from './Component/Dashboard/dashboard';
import Navbar from './Component/Navbar';
import AuthState from './Context/Auth/authState';
function App() {
  return (
    <div className="App">
    <AuthState>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<DashBoard/>} />
      <Route path='*' element={<h1>504</h1>}/>
    </Routes>
    </AuthState>
    </div> 
  );
}

export default App;
