
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import AuthContextProvider from './Context/AuthContext'
import ProductsContextProvider from './Context/ProductsContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './components/NotFound/NotFound'
function App() {
  return (
    <>
      <AuthContextProvider>
        <ProductsContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ProductsContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App
