import React, { JSX } from 'react'
import { Toolbar } from 'primereact/toolbar'
import { RiFileExcel2Line } from 'react-icons/ri'
import { MdCleaningServices } from 'react-icons/md'
import { LuCircleCheckBig } from 'react-icons/lu'
import { Tooltip } from 'primereact/tooltip'
import './registerStudentToolbar.css'

export default function RegisterStudentToolbar({
  handleSubmit
}: {
  handleSubmit: () => void
}): JSX.Element {
  const startContent = (
    <React.Fragment>
      {' '}
      <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'var(--primary-color)' }}>
        Registro de Estudiante
      </span>
    </React.Fragment>
  )
  const centerContent = <React.Fragment></React.Fragment>

  const endContent = (
    <div className="register-student-custom-toolbar-icon-container">
      <Tooltip
        target=".register-student-custom-toolbar-icon"
        mouseTrack
        mouseTrackLeft={10}
        position="bottom"
      />
      <RiFileExcel2Line
        className="register-student-custom-toolbar-icon"
        data-pr-tooltip="Importar Estudiantes desde Excel"
      />
      <MdCleaningServices
        className="register-student-custom-toolbar-icon"
        data-pr-tooltip="Limpiar Formulario"
      />
      <LuCircleCheckBig
        className="register-student-custom-toolbar-icon"
        data-pr-tooltip="Registrar Estudiante"
        onClick={handleSubmit}
      />
    </div>
  )

  return (
    <div className="card">
      <Toolbar start={startContent} center={centerContent} end={endContent} />
    </div>
  )
}
