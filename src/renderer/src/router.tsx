import { createHashRouter } from 'react-router-dom'
import Layout from './components/layout/mainLayout'
import RegisterStudent from './components/registerStudent/registerStudent'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h1>Home</h1>
      },
      {
        path: 'about',
        element: <h1>Acerca de</h1>
      },
      {
        path: 'register-student',
        element: <RegisterStudent />
      }
    ]
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
]

const router = createHashRouter(routes)

export default router
