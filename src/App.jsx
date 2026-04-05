import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import DailyRecipe from './pages/DailyRecipe';
import Contact from './pages/Contact';

// FONTOS: Be kell importálni a Provider-t!
import { RecipeProvider } from './context/RecipeContext';

// Beimportáljuk az admin fájlokat (ellenőrizd az útvonalat!)
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from "./pages/Admin/Login";// <--- Nézd meg, hogy Auth vagy Admin mappában van!
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    /* A RecipeProvider-nek kívül kell lennie, hogy mindenki lássa az adatokat! */
    <RecipeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="recipe/:id" element={<RecipeDetail />} />
            <Route path="daily" element={<DailyRecipe />} />
            <Route path="contact" element={<Contact />} />
            
            {/* A Login oldalt a sima Layout-on belül jelenítjük meg */}
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
    </RecipeProvider>
  );
}

export default App;