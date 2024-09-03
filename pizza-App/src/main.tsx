import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'
import Layout from './layout/Menu/Layout.tsx'
import { Product } from './pages/Product/Product.tsx'
import axios from 'axios'
import { PREFIX } from './helpers/API.ts'
import AuthLayout from './layout/Auth/AuthLayout.tsx'
import { Login } from './pages/Login/Login.tsx'
import { Register } from './pages/Register/Register.tsx'
import { RequireAuth } from './helpers/RequireAuth.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { Success } from './pages/Success/Success.tsx'

const Menu = lazy(() => import('./pages/Menu/Menu'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout/></RequireAuth>,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<>Загружаем...</>}>
          <Menu/>
        </Suspense>
      },
      {
        path: '/success',
        element: <Success/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/product/:id',
        element: <Product/>,
        errorElement: <>errorElement: Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.get(`${PREFIX}/products/${params.id}`)
                  .then(data => resolve(data))
                  .catch(e => reject(e))
              }, 2000);
            })
          })
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout/>,
    children: [
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      }
    ]
  },
  {
    path: '*',
    element: <Error/>
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
