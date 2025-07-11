import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import router from './router'
import 'primeicons/primeicons.css'
//import 'primereact/resources/themes/soho-dark/theme.css'
//import 'primereact/resources/themes/vela-blue/theme.css'
// import 'primereact/resources/themes/arya-blue/theme.css'
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>
)
