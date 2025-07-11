import { Card } from 'primereact/card'
import React, { JSX, useRef, useState } from 'react'
import TextBox from '../../modules/inputTex'
import NationalitySelector from '../../modules/nationalitySelector'
import CustomCalendar from '@renderer/modules/Calendar'
import GenderSelector from '../../modules/genderSelector'
import RegisterStudentToolbar from './registerStudentToolbar'
import { Nullable } from 'primereact/ts-helpers'
import { Toast } from 'primereact/toast'
import {
  CreateStudentDataInterface,
  CreateStudentResponseInterface
} from 'src/interfaces/sharedInterfaces'

export default function RegisterStudent(): React.JSX.Element {
  const [name, setName] = useState('')
  const [nameErrror, setNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameErrror, setLastNameError] = useState('')
  const [ci, setCi] = useState<number>()
  const [ciErrror, setCiError] = useState('')
  const [nationality, setNationality] = useState({ name: 'Venezolano', code: 'V' })
  const [gender, setGender] = useState('M')
  const [birthDate, setBirthDate] = useState<Nullable<Date>>()
  const [birthDateError, setBirthDateError] = useState('')
  const message = useRef<Toast>(null)
  let studentAge = 0

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNameError('')
    setName(e.target.value)
  }
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastNameError('')
    setLastName(e.target.value)
  }
  const handleCiChange = (e): void => {
    setCiError('')
    setCi(e.value)
  }

  function handleBirthDateChange(e): void {
    setBirthDateError('')
    setBirthDate(e)
  }

  const isInvalid = (): boolean => {
    let error = false
    if (!name) {
      setNameError('El campo de nombres es requerido')
      error = true
    } else {
      setNameError('')
    }
    if (!lastName) {
      setLastNameError('El campo de apellidos es requerido')
      error = true
    } else {
      setLastNameError('')
    }
    if (!ci) {
      setCiError('El campo de cedula es requerido')
      error = true
    } else {
      setCiError('')
    }

    if (!ci || ci < 2000000) {
      setCiError('La cedula debe ser mayor a dos millones')
      error = true
    } else {
      setCiError('')
    }

    if (!birthDate) {
      setBirthDateError('El campo de fecha de nacimiento es requerido')
      error = true
    } else {
      setBirthDateError('')
    }

    if (studentAge < 10) {
      setBirthDateError('El alumno debe ser mayor de 10 años')
      error = true
    } else {
      setBirthDateError('')
    }
    return error
  }

  const handleSubmit = async (): Promise<void> => {
    if (!message.current) return
    if (isInvalid()) {
      message.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Verifique los campos'
      })
      return
    }

    const studentData: CreateStudentDataInterface = {
      ci: ci?.toString() || '',
      name: name,
      lastName: lastName,
      nationality: nationality.name,
      gender: gender,
      birdthDate: birthDate?.toString() || ''
    }
    try {
      const response: CreateStudentResponseInterface =
        await window.database.createStudent(studentData)

      if (response.success) {
        message.current.show({
          severity: 'success',
          summary: 'Estudiante creado',
          detail: response.message
        })
      } else {
        message.current.show({
          severity: 'error',
          summary: 'Error',
          detail: response.message
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const calculateAge = (): number | null => {
    if (!birthDate) {
      return null
    }
    const today = new Date()
    const birthYear = birthDate.getFullYear()
    const birthMonth = birthDate.getMonth()
    const birthDay = birthDate.getDate()
    let age = today.getFullYear() - birthYear
    const monthDifference = today.getMonth() - birthMonth
    const dayDifference = today.getDate() - birthDay

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--
    }

    return age
  }
  const getAge = (): JSX.Element => {
    const age = calculateAge()
    if (age === null) {
      return <></>
    }

    if (age < 0) {
      const bd = birthDate?.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      setBirthDateError(`(${bd}) Esa fecha no existe todavia`)
      setBirthDate(undefined)
      return <></>
    }
    studentAge = age
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          width: '100px'
        }}
      >
        <label
          style={{
            position: 'absolute',
            top: '-26px',
            left: '40%',
            fontSize: '12px',
            color: 'var(--text-color-secondary)'
          }}
          htmlFor="edad"
        >
          Edad
        </label>
        <span
          style={{ color: 'var(--text-color-primary )', fontSize: '25px' }}
        >{`${age} ${age === 1 ? 'año' : 'años'}`}</span>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '100px 1fr',
        height: '100%'
      }}
    >
      <Toast ref={message} position="top-center" />
      <RegisterStudentToolbar handleSubmit={handleSubmit} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px',
          overflowY: 'auto',
          height: 'calc(95vh - 180px)'
        }}
      >
        <Card
          title="Datos de identificación"
          subTitle="Información personal del estudiante"
          style={{ maxWidth: '900px', width: '100%' }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: '20px',
              alignItems: 'baseline',
              marginTop: '20px'
            }}
          >
            <NationalitySelector
              nationality={nationality}
              setNationality={setNationality}
              width="400px"
            />
            <TextBox
              value={ci}
              onChange={handleCiChange}
              label="Cédula de Identidad"
              error={ciErrror !== ''}
              message={ciErrror}
              width="400px"
              type="number"
            />
            <TextBox
              value={name}
              onChange={handleNameChange}
              label="Nombres"
              error={nameErrror !== ''}
              message={nameErrror}
              width="400px"
            />

            <TextBox
              value={lastName}
              onChange={handleLastNameChange}
              label="Apellidos"
              error={lastNameErrror !== ''}
              message={lastNameErrror}
              width="400px"
            />

            <GenderSelector gender={gender} setGender={setGender} width="400px" />
            <CustomCalendar
              date={birthDate}
              setDate={handleBirthDateChange}
              width="250px"
              label="Fecha de nacimiento"
              error={birthDateError !== ''}
              message={birthDateError}
            />
            {getAge()}
          </div>
        </Card>

        <Card
          title="Datos de dirección"
          subTitle="Información sobre la residencia del estudiante"
          style={{ maxWidth: '900px', width: '100%' }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: '20px',
              alignItems: 'baseline',
              marginTop: '20px'
            }}
          ></div>
        </Card>
      </div>
    </div>
  )
}
