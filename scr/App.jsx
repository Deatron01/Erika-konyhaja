import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import DailyRecipe from './pages/DailyRecipe';
import Contact from './pages/Contact';

// Placeholder az adminhoz
const AdminDashboard = () => <div className="p-10 text-center font-bold text-brand-dark">Admin Felület (Fejlesztés alatt)</div>;

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false; // Később ide jön az auth logika
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          {/* DailyRecipe page logika megegyezhet a Detail-lel, csak a "isDaily: true" alapján szűr */}
          <Route path="daily" element={<DailyRecipe />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Védett útvonalak előkészítése */}
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