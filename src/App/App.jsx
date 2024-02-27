import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginSignupPage from '../Pages/LoginSignupPage.jsx';
import ItemForm from '../Components/ItemCreate.jsx';
import ItemList from '../Pages/ItemList.jsx'
import ItemViewPage from '../Components/ItemViewPage.jsx';
import Logout from '../Components/Logout.jsx';
import Menu from '../Components/Menu.jsx';
import './App.css';

function App() {
  return (
    <>

    <div className="App">
      <header>
      <Menu />
        <h1>Sustainable Swap Shop</h1>
      </header>

    <div>
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={<LoginSignupPage />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/items/:itemId' element={<ItemViewPage />} />
        <Route path='/item/create' element={<ItemForm />} />
        <Route path='/' element={<ItemList />} /> 

      </Routes>
      </BrowserRouter>
    </div>
    </div>
    </>

  );
}

export default App;
