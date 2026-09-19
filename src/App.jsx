import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import DailyRecipe from './pages/DailyRecipe';
import Story from './pages/Story';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { RecipeProvider } from './context/RecipeContext';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Admin/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Adat-router kell a View Transitions API-hoz (viewTransition a Link-eken)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'recipes', element: <Recipes /> },
      { path: 'recipe/:id', element: <RecipeDetail /> },
      { path: 'daily', element: <DailyRecipe /> },
      { path: 'tortenetem', element: <Story /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <RecipeProvider>
      {/* reducedMotion="user": a Motion animációk tiszteletben tartják a rendszerbeállítást */}
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </MotionConfig>
    </RecipeProvider>
  );
}

export default App;
