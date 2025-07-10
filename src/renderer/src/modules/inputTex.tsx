import { JSX } from 'react'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'

export default function CustomInputText({
  value,
  onChange,
  label,
  error,
  message,
  width = '100%',
  type = 'text'
}: {
  value: string | number | undefined
  onChange: (value) => void
  label: string
  error: boolean
  message: string
  width?: string
  type?: 'text' | 'number'
}): JSX.Element {
  const inputValueForNumber = type === 'number' && isNaN(Number(value)) ? null : Number(value)
  const inputValueForText = type === 'text' ? value?.toString() : ''

  return (
    <div style={{ width, height: '90px' }}>
      <FloatLabel>
        {type === 'number' ? (
          <InputNumber
            value={inputValueForNumber}
            onChange={onChange}
            style={{ width: '100%' }}
            invalid={error}
            mode="decimal"
            locale="es-ES"
          />
        ) : (
          <InputText
            value={inputValueForText}
            onChange={onChange}
            style={{ width: '100%' }}
            invalid={error}
          />
        )}

        <label htmlFor="username">{label}</label>
        <small id="username-help" className={error ? 'p-error' : ''}>
          {message}
        </small>
      </FloatLabel>
    </div>
  )
}
