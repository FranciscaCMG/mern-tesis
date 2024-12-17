import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from './pages/Index';
import Layout from './pages/Layout';
import Main from './pages/Main';
import Home from './components/Home';
import Templates from "./components/Templates";
import Projects from "./components/Projects";
import CreateDesing from "./components/CreateDesing";
import './App.css'
import Prueba from "./components/Prueba";
import { token_decode } from './utils/index'

const userInfo = token_decode(localStorage.getItem('canva_token'))

const router = createBrowserRouter([
  {
    path: '/',
    element: userInfo ? <Layout /> : <Index />,
    children : [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/templates',
        element: <Templates />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
    ]
  },
  {
    path : '/desing/create',
    element : <CreateDesing/>
  },
  {
    path: '/design/:design_id/edit',
    element: userInfo ? <Main /> : <Navigate to='/' />
  },
  {
    path : '/prueba',
    element : <Prueba/>
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App
