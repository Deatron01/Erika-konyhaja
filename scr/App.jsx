import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import DailyRecipe from './pages/DailyRecipe';
import Contact from './pages/Contact';

// Beimportáljuk az elkészült külön fájlokat!
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Admin/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          <Route path="daily" element={<DailyRecipe />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Beállítottuk a Login útvonalat is */}
          <Route path="login" element={<Login />} />
          
          {/* Védett útvonal az adminhoz */}
          <Route 
            path="admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;