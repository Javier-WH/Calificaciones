import { Card } from 'primereact/card'
import { useState } from 'react'
import TextBox from '../../modules/inputTex'

export default function RegisterStudent(): React.JSX.Element {
  const [name, setName] = useState('')
  const [nameErrror, setNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameErrror, setLastNameError] = useState('')

  return (
    <div>
      <Card title="Identificación" subTitle="Información personal del estudiante">
        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '20px' }}>
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
        </div>
      </Card>
    </div>
  )
}
