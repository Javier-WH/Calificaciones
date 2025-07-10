import { JSX } from 'react'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'

export default function CustomInputText({
  value,
  onChange,
  label,
  error,
  message,
  width = '100%'
}: {
  value: string
  onChange: (value) => void
  label: string
  error: boolean
  message: string
  width?: string
}): JSX.Element {
  return (
    <div style={{ width, height: '90px' }}>
      <FloatLabel>
        <InputText value={value} onChange={onChange} style={{ width: '100%' }} />
        <label htmlFor="username">{label}</label>
        <small id="username-help" className={error ? 'p-error' : ''}>
          {message}
        </small>
      </FloatLabel>
    </div>
  )
}
