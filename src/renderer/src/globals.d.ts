import {
  CreateStudentDataInterface,
  CreateStudentResponseInterface,
  NationalityInterface
} from 'src/interfaces/sharedInterfaces'

declare global {
  interface Window {
    database: {
      createStudent: (
        studentData: CreateStudentDataInterface
      ) => Promise<CreateStudentResponseInterface>
      getNationalities: () => Promise<{ success: boolean; data: NationalityInterface }>
    }
  }
}
