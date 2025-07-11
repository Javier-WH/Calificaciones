/* eslint-disable react-hooks/exhaustive-deps */
import { JSX, useEffect, useState } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { NationalityInterface } from 'src/interfaces/sharedInterfaces'

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
  const [nationalities, setNationalities] = useState<Nationality[]>([])
  useEffect(() => {
    const getNationalities = async (): Promise<void> => {
      const nationalities = await window.database.getNationalities()
      const data = nationalities.data as unknown as NationalityInterface[]
      const options = data.map((nationality) => ({
        name: nationality.nationality,
        code: nationality.id
      }))

      if (options.length > 0) {
        setNationality(options[0])
      }
      setNationalities(options)
    }
    getNationalities()
  }, [])

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <Dropdown
          value={nationality}
          onChange={(e: DropdownChangeEvent) => setNationality(e.value)}
          options={nationalities}
          optionLabel="name"
          placeholder="Seleccione una nacionalidad"
          style={{ width: '100%' }}
        />
        <label htmlFor="birth_date">Nacionalidad</label>
      </FloatLabel>
    </div>
  )
}
