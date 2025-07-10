// src/components/Layout.jsx (o donde prefieras ubicarlo)
import { Outlet } from 'react-router-dom'

export default function Layout(): React.JSX.Element {
  return (
    <div>
      {/* Aquí puedes poner elementos comunes a todas tus páginas, como un Navbar o Footer */}
      <header style={{ background: '#f0f0f0', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <h1>Mi Aplicación</h1>
        <nav>
          <a href="#/">Inicio</a> | <a href="#/about">Acerca de</a>
        </nav>
      </header>

      <main style={{ padding: '20px' }}>
        {/* Aquí se renderizará el componente de la ruta hija */}
        <Outlet />
      </main>

      <footer
        style={{
          background: '#f0f0f0',
          padding: '10px',
          borderTop: '1px solid #ccc',
          marginTop: '20px'
        }}
      >
        <p>&copy; 2025 Mi Compañía</p>
      </footer>
    </div>
  )
}
