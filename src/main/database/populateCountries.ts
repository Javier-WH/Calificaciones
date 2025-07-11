/* eslint-disable @typescript-eslint/no-explicit-any */
import Countries from './models/countries'

import * as countriesData from './countries.json'

export async function populateCountriesData(): Promise<void> {
  try {
    const countrieData = (countriesData as any)?.default

    // Paso 1: Preparar e insertar Paises
    const countriesToCreate = countrieData.map((countrie: any) => ({
      country: countrie.nameES,
      active: true
    }))

    const createdStateInstances = await Countries.bulkCreate(countriesToCreate, {
      ignoreDuplicates: true,
      returning: true
    })

    const countrieNameToIdMap = new Map<string, string>()
    createdStateInstances.forEach((stateInstance) => {
      countrieNameToIdMap.set(stateInstance.dataValues.country, stateInstance.dataValues.id)
      //console.log(`Pais procesado: ${stateInstance.dataValues.country}`)
    })
  } catch (error) {
    console.error('Error al poblar la base de datos:', error)
    //console.error('Error al poblar la base de datos')
  }
}
