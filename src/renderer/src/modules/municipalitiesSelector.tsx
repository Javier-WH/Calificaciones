/* eslint-disable react-hooks/exhaustive-deps */
import { JSX, useEffect, useState } from 'react'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'
import { FloatLabel } from 'primereact/floatlabel'
import { MunicipalityInterface } from 'src/interfaces/sharedInterfaces'

interface Municipaly {
  name: string
  code: string
}

export default function MunicipalitiesSelector({
  width = '100%',
  municipaltie,
  setMunicipaltie,
  country,
  stateId
}: {
  width?: string
  municipaltie: Municipaly
  setMunicipaltie: (value: Municipaly) => void
  country: string
  stateId: string
}): JSX.Element {
  const [allMunicipalties, setAllMunicipalties] = useState<Municipaly[]>([])
  const [filteredMunicipalties, setFilteredMunicipalties] = useState<Municipaly[]>([])

  useEffect(() => {
    if (country !== 'Venezuela') {
      return
    }
    const getMunicipalties = async (): Promise<void> => {
      const municipalties = await window.database.getMunicipalities()
      const data = municipalties.data as unknown as MunicipalityInterface[]
      const filteredData = data.filter(
        (municipaltie) => municipaltie.active && municipaltie.state_id === stateId
      )
      const options = filteredData.map((municipaltie) => ({
        name: municipaltie.municipality,
        code: municipaltie.id
      }))

      const monagasOption = options.find((option) => option.name === 'Monagas')
      if (monagasOption) {
        setMunicipaltie(monagasOption)
      } else {
        setMunicipaltie({ name: '', code: '' })
      }
      setAllMunicipalties(options)
    }
    getMunicipalties()
  }, [stateId, country])

  const searchStates = (event: AutoCompleteCompleteEvent): void => {
    const query = event.query.toLowerCase()
    const _filteredStates = allMunicipalties.filter((s) => s.name.toLowerCase().includes(query))
    setFilteredMunicipalties(_filteredStates)
  }

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <AutoComplete
          value={country !== 'Venezuela' ? '' : municipaltie ? municipaltie.name : ''}
          suggestions={filteredMunicipalties}
          completeMethod={searchStates}
          field="name"
          onChange={(e) => {
            if (typeof e.value === 'object') {
              setMunicipaltie(e.value)
            } else {
              setMunicipaltie({ name: e.value, code: '' })
            }
          }}
          onSelect={(e) => setMunicipaltie(e.value as Municipaly)}
          dropdown
          forceSelection
          style={{ width: '100%' }}
          disabled={country !== 'Venezuela'}
        />
        <label htmlFor="state-autocomplete">Municipio</label>
      </FloatLabel>
    </div>
  )
}
