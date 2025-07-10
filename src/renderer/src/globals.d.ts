import {
  CreateStudentDataInterface,
  CreateStudentResponseInterface
} from 'src/interfaces/sharedInterfaces'

declare global {
  interface Window {
    database: {
      createStudent: (
        studentData: CreateStudentDataInterface
      ) => Promise<CreateStudentResponseInterface>
    }
  }
}
