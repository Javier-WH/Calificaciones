import { JSX } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'

interface Nationality {
  name: string
  code: string
}

export default function NationalitySelector({
  width = '100%',
  nationality,
  setNationality
}: {
  width?: string
  nationality: Nationality
  setNationality: (value: Nationality) => void
}): JSX.Element {
  const cities: Nationality[] = [
    { name: 'Venezolano', code: 'V' },
    { name: 'Extranjero', code: 'E' },
    { name: 'Pasaporte', code: 'P' },
    { name: 'Carnet Diplomático', code: 'D' },
    { name: 'Carnet Estudiantil', code: 'S' }
  ]

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <Dropdown
          value={nationality}
          onChange={(e: DropdownChangeEvent) => setNationality(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Seleccione una nacionalidad"
          style={{ width: '100%' }}
        />
        <label htmlFor="birth_date">Nacionalidad</label>
      </FloatLabel>
    </div>
  )
}
