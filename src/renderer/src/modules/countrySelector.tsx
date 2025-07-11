/* eslint-disable react-hooks/exhaustive-deps */
import { JSX, useEffect, useState } from 'react'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'
import { FloatLabel } from 'primereact/floatlabel'
import { CountryInterface } from 'src/interfaces/sharedInterfaces'

interface Country {
  name: string
  code: string
}

export default function CountrySelector({
  width = '100%',
  country,
  setState
}: {
  width?: string
  country: Country
  setState: (value: Country) => void
}): JSX.Element {
  const [allStates, setAllStates] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

  useEffect(() => {
    const getCountries = async (): Promise<void> => {
      const countries = await window.database.getCountries()
      const data = countries.data as unknown as CountryInterface[]
      const filteredData = data.filter((country) => country.active)
      const options = filteredData.map((country) => ({
        name: country.country,
        code: country.id
      }))

      if (options.length > 0) {
        // Set the initial state to the first option if not already set
        if (!country || !country.code) {
          const venezuelaOption = options.find((option) => option.name === 'Venezuela')
          if (venezuelaOption) {
            setState(venezuelaOption)
          }
        }
      }
      setAllStates(options)
    }
    getCountries()
  }, [])

  const searchCountries = (event: AutoCompleteCompleteEvent): void => {
    const query = event.query.toLowerCase()
    const _filteredCountries = allStates.filter((s) => s.name.toLowerCase().includes(query))
    setFilteredCountries(_filteredCountries)
  }

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <AutoComplete
          value={country ? country.name : ''}
          suggestions={filteredCountries}
          completeMethod={searchCountries}
          field="name"
          onChange={(e) => {
            if (typeof e.value === 'object') {
              setState(e.value)
            } else {
              setState({ name: e.value, code: '' })
            }
          }}
          onSelect={(e) => setState(e.value as Country)}
          dropdown
          forceSelection
          style={{ width: '100%' }}
        />
        <label htmlFor="state-autocomplete">Pais</label>
      </FloatLabel>
    </div>
  )
}
