// src/components/Layout.jsx (o donde prefieras ubicarlo)
import { Outlet } from 'react-router-dom'
import MainToolbar from '../toolbar/mainToolbar'

export default function Layout(): React.JSX.Element {
  return (
    <div style={{ display: 'grid', gridTemplateRows: '80px 1fr 5px', height: '95vh' }}>
      <MainToolbar />

      <main
        style={{
          padding: '0px 20px 0px 20px'
        }}
      >
        <Outlet />
      </main>

      <footer>
        <p>&copy; 2025 Mi Compañía</p>
      </footer>
    </div>
  )
}
