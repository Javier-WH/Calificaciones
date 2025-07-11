/* eslint-disable @typescript-eslint/no-explicit-any */
import State from './models/states'
import Municipality from './models/municipality'
import Parish from './models/parish'

import * as venezuelaData from './venezuela.json'

export async function populateVenezuelaData(): Promise<void> {
  try {
    const statesData = (venezuelaData as any)?.default

    // Paso 1: Preparar e insertar Estados
    const statesToCreate = statesData.map((state: any) => ({
      state: state.estado,
      active: true
    }))

    const createdStateInstances = await State.bulkCreate(statesToCreate, {
      ignoreDuplicates: true,
      returning: true
    })

    const stateNameToIdMap = new Map<string, string>()
    createdStateInstances.forEach((stateInstance) => {
      stateNameToIdMap.set(stateInstance.dataValues.state, stateInstance.dataValues.id)
      //console.log(`Estado procesado: ${stateInstance.dataValues.state}`)
    })

    // Paso 2: Preparar e insertar Municipios
    const municipalitiesToCreate: Array<any> = []
    statesData.forEach((state: any) => {
      const stateId = stateNameToIdMap.get(state.estado)
      if (stateId) {
        state.municipios.forEach((municipality: any) => {
          municipalitiesToCreate.push({
            state_id: stateId,
            municipality: municipality.municipio,
            active: true
          })
        })
      }
    })

    const createdMunicipalityInstances = await Municipality.bulkCreate(municipalitiesToCreate, {
      ignoreDuplicates: true,
      returning: true
    })

    // Para mapear municipios a sus IDs (necesario para las parroquias)
    // Usamos una clave compuesta (state_id + municipality_name) para asegurar unicidad en el mapa
    const municipalityCompoundKeyToIdMap = new Map<string, string>()
    createdMunicipalityInstances.forEach((municipalityInstance) => {
      const compoundKey = `${municipalityInstance.dataValues.state_id}-${municipalityInstance.dataValues.municipality}`
      municipalityCompoundKeyToIdMap.set(compoundKey, municipalityInstance.dataValues.id)
      console.log(`  Municipio procesado: ${municipalityInstance.dataValues.municipality}`)
    })

    // Paso 3: Preparar e insertar Parroquias
    const parishesToCreate: Array<any> = []
    statesData.forEach((state: any) => {
      const stateId = stateNameToIdMap.get(state.estado)
      if (stateId) {
        state.municipios.forEach((municipality: any) => {
          const compoundKey = `${stateId}-${municipality.municipio}`
          const municipalityId = municipalityCompoundKeyToIdMap.get(compoundKey)

          if (municipalityId && municipality.parroquias) {
            municipality.parroquias.forEach((parishName: string) => {
              parishesToCreate.push({
                municipality_id: municipalityId,
                parish: parishName,
                active: true
              })
            })
          }
        })
      }
    })

    await Parish.bulkCreate(parishesToCreate, { ignoreDuplicates: true })
    console.log('  Todas las parroquias procesadas.')

    console.log('Población de datos completada.')
  } catch (error) {
    console.error('Error al poblar la base de datos:', error)
    //console.error('Error al poblar la base de datos:')
  }
}
