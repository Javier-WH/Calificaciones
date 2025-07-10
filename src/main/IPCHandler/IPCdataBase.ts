import { ipcMain } from 'electron'
import Students from '../database/models/students'
import {
  CreateStudentDataInterface,
  CreateStudentResponseInterface
} from '../../interfaces/sharedInterfaces'
import { ValidationError } from 'sequelize'

export default function IPCdataBase(): void {
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
}
