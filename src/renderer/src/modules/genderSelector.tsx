import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton'
import { JSX } from 'react'

export default function GenderSelector({
  gender,
  setGender
}: {
  gender: string
  setGender: (value: string) => void
}): JSX.Element {
  return (
    <div style={{ width: '100%', height: '90px', position: 'relative' }}>
      <label
        htmlFor="gender"
        style={{
          position: 'absolute',
          top: '-23px',
          left: '10px',
          fontSize: '12px',
          color: 'var(--text-color-secondary)'
        }}
      >
        Sexo
      </label>

      <div style={{ display: 'flex', columnGap: '20px' }}>
        <div>
          <RadioButton
            inputId="masculino"
            name="gender"
            value="M"
            onChange={(e: RadioButtonChangeEvent) => setGender(e.value)}
            checked={gender === 'M'}
          />
          &nbsp;&nbsp;
          <label htmlFor="masculino" className="ml-2">
            Masculino
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="femenino"
            name="gender"
            value="F"
            onChange={(e: RadioButtonChangeEvent) => setGender(e.value)}
            checked={gender === 'F'}
          />
          &nbsp;&nbsp;
          <label htmlFor="femenino" className="ml-2">
            Femenino
          </label>
        </div>
      </div>
    </div>
  )
}
