import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { CreateStudentDataInterface } from '../../interfaces/sharedInterfaces'

function App(): React.JSX.Element {
  const ipcHandle = async (): Promise<void> => {
    const studentData: CreateStudentDataInterface = {
      ci: '12345678',
      name: 'John',
      lastName: 'Doe',
      nationality: 'Colombia',
      gender: 'M',
      birdthDate: '1990-01-01'
    }

    try {
      // Await la respuesta directamente de la llamada a createStudent
      const response = await window.database.createStudent(studentData)

      if (response.success) {
        // Si la operación fue exitosa, 'response.data' contendrá el estudiante creado
        console.log('Datos del estudiante creado:', response.message)
      } else {
        // Si hubo un error, 'response.data' contendrá el mensaje de error
        console.error('Detalles del error:', response.message)
      }
    } catch (error: unknown) {
      // Este catch manejará errores inesperados en la comunicación IPC o en la Promesa.
      console.error('Error de IPC:', error)
    }
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
