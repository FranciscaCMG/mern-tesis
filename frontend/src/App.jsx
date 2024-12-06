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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
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
    path : '/desing/:id/edit',
    element : <Main/>
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App
