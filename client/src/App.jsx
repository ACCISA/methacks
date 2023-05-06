import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import IndexPage from "./pages/IndexPage"
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import axios from "axios"
import ManagePage from './pages/ManagePage';
import AddFamily from './pages/AddFamily';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/manage/new" element={<AddFamily />} />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
