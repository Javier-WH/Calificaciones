/* eslint-disable react-hooks/exhaustive-deps */
import { JSX, useEffect, useState } from 'react'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'
import { FloatLabel } from 'primereact/floatlabel'
import { StateInterface } from 'src/interfaces/sharedInterfaces'

interface State {
  name: string
  code: string
}

export default function StateSelector({
  width = '100%',
  state,
  setState,
  country
}: {
  width?: string
  state: State
  setState: (value: State) => void
  country: string
}): JSX.Element {
  const [allStates, setAllStates] = useState<State[]>([])
  const [filteredStates, setFilteredStates] = useState<State[]>([])

  useEffect(() => {
    if (country === 'Venezuela') {
      const guaricoOption = allStates.find((option) => option.name === 'Guárico')
      if (guaricoOption) {
        setState(guaricoOption)
      }
    }
  }, [country])

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
        if (!state || !state.code) {
          const guaricoOption = allStates.find((option) => option.name === 'Guárico')
          if (guaricoOption) {
            setState(guaricoOption)
          }
        }
      }
      setAllStates(options)
    }
    getStates()
  }, [])

  const searchStates = (event: AutoCompleteCompleteEvent): void => {
    const query = event.query.toLowerCase()
    const _filteredStates = allStates.filter((s) => s.name.toLowerCase().includes(query))
    setFilteredStates(_filteredStates)
  }

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <AutoComplete
          value={country !== 'Venezuela' ? '' : state ? state.name : ''}
          suggestions={filteredStates}
          completeMethod={searchStates}
          field="name"
          onChange={(e) => {
            if (typeof e.value === 'object') {
              setState(e.value)
            } else {
              setState({ name: e.value, code: '' })
            }
          }}
          onSelect={(e) => setState(e.value as State)}
          dropdown
          forceSelection
          style={{ width: '100%' }}
          disabled={country !== 'Venezuela'}
        />
        <label htmlFor="state-autocomplete">Estado</label>
      </FloatLabel>
    </div>
  )
}
