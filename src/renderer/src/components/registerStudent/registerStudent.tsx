import { Card } from 'primereact/card'
import React, { JSX, useState } from 'react'
import TextBox from '../../modules/inputTex'
import NationalitySelector from '../../modules/nationalitySelector'
import CustomCalendar from '@renderer/modules/Calendar'
import GenderSelector from '../../modules/genderSelector'
import { Nullable } from 'primereact/ts-helpers'
import { Button } from 'primereact/button'

export default function RegisterStudent(): React.JSX.Element {
  const [name, setName] = useState('')
  const [nameErrror, setNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameErrror, setLastNameError] = useState('')
  const [ci, setCi] = useState<number>()
  const [ciErrror, setCiError] = useState('')
  const [nationality, setNationality] = useState({ name: 'Venezolano', code: 'V' })
  const [gender, setGender] = useState('M')
  const [birthDate, setBirthDate] = useState<Nullable<Date>>(new Date())
  const [birthDateError, setBirthDateError] = useState('')
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
    if (isInvalid()) {
      return
    }
  }

  const getAge = (): JSX.Element => {
    if (!birthDate) {
      return <></>
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Card
        title="Identificación"
        subTitle="Información personal del estudiante"
        style={{ maxWidth: '900px', width: '100%', height: '100%' }}
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
            label="Fecha de nacimiento (dia/mes/año)"
            error={birthDateError !== ''}
            message={birthDateError}
          />
          {getAge()}
        </div>
      </Card>

      <Button label="Guardar" style={{ marginTop: '20px' }} onClick={handleSubmit} />
    </div>
  )
}
