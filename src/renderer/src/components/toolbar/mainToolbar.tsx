import { Menubar } from 'primereact/menubar'
import { MenuItem } from 'primereact/menuitem'
import { useNavigate } from 'react-router-dom'
import BatallaLogo from '../../assets/Batalla_Logo_A.png'
import { JSX } from 'react'

export default function MainToolbar(): JSX.Element {
  const navigate = useNavigate()
  const items: MenuItem[] = [
    {
      label: 'Archivo',
      icon: 'pi pi-file',
      items: [
        {
          label: 'Inicio',
          icon: 'pi pi-home',
          command: () => navigate('/')
        },
        {
          label: 'Registro de usuario',
          icon: 'pi pi-user-edit'
        },
        {
          label: 'Errores detectados',
          icon: 'pi pi-wave-pulse'
        },
        {
          separator: true
        },
        {
          label: 'Salir',
          icon: 'pi pi-sign-out'
        }
      ]
    },
    {
      label: 'Alumnos',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Buscar',
          icon: 'pi pi-search'
        },
        {
          label: 'Registro',
          icon: 'pi pi-user-plus',
          command: () => navigate('/register-student')
        },
        {
          label: 'Retiro',
          icon: 'pi pi-user-minus'
        },
        {
          label: 'Cargar Notas',
          icon: 'pi pi-chart-bar'
        }
      ]
    },
    {
      label: 'Pensum',
      icon: 'pi pi-book',
      items: [
        {
          label: 'Materias',
          icon: 'pi pi-pencil'
        },
        {
          label: 'Definir Pensum',
          icon: 'pi pi-bookmark'
        }
      ]
    },
    {
      label: 'Profesores',
      icon: 'pi pi-graduation-cap',
      items: [
        {
          label: 'Buscar',
          icon: 'pi pi-search'
        },
        {
          label: 'Registro',
          icon: 'pi pi-user-plus'
        },
        {
          label: 'Retiro',
          icon: 'pi pi-user-minus'
        }
      ]
    },
    {
      label: 'Reportes',
      icon: 'pi pi-receipt',
      items: [
        {
          label: 'Imprimir notas finales de curso ',
          icon: 'pi pi-print'
        },
        {
          label: 'Imprimir notas revisión y pendientes',
          icon: 'pi pi-print'
        },
        {
          label: 'Imprimir notas certificadas',
          icon: 'pi pi-print'
        },
        {
          label: 'Imprimir boletín',
          icon: 'pi pi-print'
        },
        {
          label: 'Listado de alumnos',
          icon: 'pi pi-print'
        }
      ]
    },
    {
      label: 'Ayuda',
      icon: 'pi pi-question',
      items: [
        {
          label: 'Acerca del sistema',
          icon: 'pi pi-question-circle',
          command: () => navigate('/about')
        }
      ]
    }
  ]

  const start = (
    <img
      alt="logo"
      src={BatallaLogo}
      height="50"
      className="mr-2"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/')}
    ></img>
  )

  return (
    <div className="card" style={{ width: '100%' }}>
      <Menubar model={items} start={start} style={{ minWidth: '1024px' }} />
    </div>
  )
}
