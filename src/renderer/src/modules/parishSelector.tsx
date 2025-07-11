/* eslint-disable react-hooks/exhaustive-deps */
import { JSX, useEffect, useState } from 'react'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'
import { FloatLabel } from 'primereact/floatlabel'
import { ParishInterface } from 'src/interfaces/sharedInterfaces'

interface Parish {
  name: string
  code: string
}

export default function ParishSelector({
  width = '100%',
  parish,
  setParish,
  country,
  municipalityId
}: {
  width?: string
  parish: Parish
  setParish: (value: Parish) => void
  country: string
  municipalityId: string
}): JSX.Element {
  const [allParishs, setAllParishs] = useState<Parish[]>([])
  const [filteredParishs, setFilteredParishs] = useState<Parish[]>([])

  useEffect(() => {
    if (country !== 'Venezuela') {
      return
    }
    const getparishs = async (): Promise<void> => {
      const parishs = await window.database.getParishes()
      const data = parishs.data as unknown as ParishInterface[]
      const filteredData = data.filter(
        (parish) => parish.active && parish.municipality_id === municipalityId
      )
      const options = filteredData.map((parish) => ({
        name: parish.parish,
        code: parish.id
      }))

      const AltagraciaOption = options.find((option) => option.name === 'Altagracia de Orituco')
      if (AltagraciaOption) {
        setParish(AltagraciaOption)
      } else {
        setParish({ name: '', code: '' })
      }
      setAllParishs(options)
    }
    getparishs()
  }, [municipalityId, country])

  const searchStates = (event: AutoCompleteCompleteEvent): void => {
    const query = event.query.toLowerCase()
    const _filteredStates = allParishs.filter((s) => s.name.toLowerCase().includes(query))
    setFilteredParishs(_filteredStates)
  }

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <AutoComplete
          value={country !== 'Venezuela' ? '' : parish ? parish.name : ''}
          suggestions={filteredParishs}
          completeMethod={searchStates}
          field="name"
          onChange={(e) => {
            if (typeof e.value === 'object') {
              setParish(e.value)
            } else {
              setParish({ name: e.value, code: '' })
            }
          }}
          onSelect={(e) => setParish(e.value as Parish)}
          dropdown
          forceSelection
          style={{ width: '100%' }}
          disabled={country !== 'Venezuela'}
        />
        <label htmlFor="state-autocomplete">Parroquia</label>
      </FloatLabel>
    </div>
  )
}
