import { Card } from 'primereact/card'
import { useState } from 'react'
import TextBox from '../../modules/inputTex'
import NationalitySelector from '../../modules/nationalitySelector'
import CustomCalendar from '@renderer/modules/Calendar'
import GenderSelector from '../../modules/genderSelector'
import { Nullable } from 'primereact/ts-helpers'

export default function RegisterStudent(): React.JSX.Element {
  const [name, setName] = useState('')
  const [nameErrror, setNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameErrror, setLastNameError] = useState('')
  const [ci, setCi] = useState('')
  const [ciErrror, setCiError] = useState('')
  const [nationality, setNationality] = useState({ name: 'Venezolano', code: 'V' })
  const [gender, setGender] = useState('M')
  const [birdthDate, setBirdthDate] = useState<Nullable<Date>>(new Date())

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
            alignItems: 'center',
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
            onChange={(e) => setCi(e.target.value)}
            label="Cédula de Identidad"
            error={ciErrror !== ''}
            message={ciErrror}
            width="400px"
            type="number"
          />
          <TextBox
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nombres"
            error={nameErrror !== ''}
            message={nameErrror}
            width="400px"
          />

          <TextBox
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label="Apellidos"
            error={lastNameErrror !== ''}
            message={lastNameErrror}
            width="400px"
          />

          <GenderSelector gender={gender} setGender={setGender} />

          <CustomCalendar date={birdthDate} setDate={setBirdthDate} width="400px" />
        </div>
      </Card>
    </div>
  )
}
