import { ipcMain } from 'electron'
import Students from '../database/models/students'
import Nationality from '../database/models/nationality'
import States from '../database/models/states'
import {
  CreateStudentDataInterface,
  CreateStudentResponseInterface,
  CreateNationalityResponseInterface,
  CreateStateResponseInterface,
  CreateCountryResponseInterface,
  CreateMunicipalityResponseInterface,
  CreateParishResponseInterface
} from '../../interfaces/sharedInterfaces'
import { ValidationError } from 'sequelize'
import Countries from '../database/models/countries'
import Municipality from '../database/models/municipality'
import Parish from '../database/models/parish'

export default function IPCdataBase(): void {
  /* Estudiantes */
  // este handler se encarga de crear un estudiante
  ipcMain.handle('db:createStudent', async (_event, studentData: CreateStudentDataInterface) => {
    try {
      const newStudent = await Students.create({ ...studentData }, { raw: true })
      const data = newStudent.dataValues
      const response: CreateStudentResponseInterface = {
        success: true,
        message: 'Estudiante creado exitosamente',
        data
      }
      return response
    } catch (error: unknown) {
      let errorMessage: string
      const response: CreateStudentResponseInterface = {
        success: false,
        message: 'Error al crear estudiante'
      }
      if (error instanceof ValidationError) {
        if (error.errors && error.errors.length > 0) {
          errorMessage = error.errors[0].message
          if (errorMessage === 'ci must be unique') {
            response.message = 'La cédula ingresada ya se encuentra registrada'
          } else {
            console.error('Error de validación:', error)
            response.message = `Error de validación: ${errorMessage}`
          }
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
        response.message = `Error interno: ${errorMessage}`
      }

      return response
    }
  })
  /* Nacionalidades */
  //este handler se encarga de obtener la lista de nacionalidades
  ipcMain.handle('db:getNationality', async () => {
    try {
      const nationalities = await Nationality.findAll({ raw: true })

      const response: CreateNationalityResponseInterface = {
        success: true,
        message: 'Nacionalidades obtenidas exitosamente',
        data: nationalities
      }
      return response
    } catch (error: unknown) {
      console.error('Error al obtener nacionalidades:', error)
      return []
    }
  })

  /* Paises */
  ipcMain.handle('db:getCountries', async () => {
    try {
      const countries = await Countries.findAll({ raw: true })

      const response: CreateCountryResponseInterface = {
        success: true,
        message: 'Paises obtenidos exitosamente',
        data: countries
      }
      return response
    } catch (error: unknown) {
      console.error('Error al obtener paises:', error)
      return []
    }
  })

  /* Estados */
  ipcMain.handle('db:getStates', async () => {
    try {
      const nationalities = await States.findAll({ raw: true })

      const response: CreateStateResponseInterface = {
        success: true,
        message: 'Estados obtenidos exitosamente',
        data: nationalities
      }
      return response
    } catch (error: unknown) {
      console.error('Error al obtener estados:', error)
      return []
    }
  })

  /* Municipios */
  ipcMain.handle('db:getMunicipalities', async () => {
    try {
      const municipalitys = await Municipality.findAll({ raw: true })

      const response: CreateMunicipalityResponseInterface = {
        success: true,
        message: 'Municipios obtenidos exitosamente',
        data: municipalitys
      }
      return response
    } catch (error: unknown) {
      console.error('Error al obtener municipios:', error)
      return []
    }
  })

  /* Parroquias */
  ipcMain.handle('db:getParishes', async () => {
    try {
      const parishes = await Parish.findAll({ raw: true })

      const response: CreateParishResponseInterface = {
        success: true,
        message: 'Parroquias obtenidas exitosamente',
        data: parishes
      }
      return response
    } catch (error: unknown) {
      console.error('Error al obtener parroquias:', error)
      return []
    }
  })
}
