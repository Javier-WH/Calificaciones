/* eslint-disable react-hooks/exhaustive-deps */
import { JSX, useEffect, useState } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { AutoComplete } from 'primereact/autocomplete'
import { FloatLabel } from 'primereact/floatlabel'
import { StateInterface } from 'src/interfaces/sharedInterfaces'

interface State {
  name: string
  code: string
}

export default function StateSelector({
  width = '100%',
  state,
  setState
}: {
  width?: string
  state: State
  setState: (value: State) => void
}): JSX.Element {
  const [states, setStates] = useState<State[]>([])

  useEffect(() => {
    const getStates = async (): Promise<void> => {
      const states = await window.database.getStates()
      const data = states.data as unknown as StateInterface[]
      const filteredData = data.filter((nationality) => nationality.active)
      const options = filteredData.map((nationality) => ({
        name: nationality.state,
        code: nationality.id
      }))

      if (options.length > 0) {
        setState(options[0])
      }
      setStates(options)
    }
    getStates()
  }, [])

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <Dropdown
          value={state}
          onChange={(e: DropdownChangeEvent) => setState(e.value)}
          options={states}
          optionLabel="name"
          placeholder="Seleccione un estado"
          style={{ width: '100%' }}
        />
        <label htmlFor="birth_date">Estado</label>
      </FloatLabel>
    </div>
  )
}
