import { createHashRouter } from 'react-router-dom'
import Layout from './components/layout/mainLayout'

// 1. Definir las rutas como un array de objetos
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Esto hace que '/'(la ruta padre) renderice HomePage por defecto
        element: <h1>Home</h1>
      },
      {
        path: 'about',
        element: <h1>Acerca de</h1>
      }
    ]
  },
  {
    path: '*', // Ruta comodín para 404
    element: <h1>404</h1>
  }
]

const router = createHashRouter(routes)

export default router
