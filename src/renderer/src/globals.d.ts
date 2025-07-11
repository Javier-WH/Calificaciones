import {
  CreateStudentDataInterface,
  CreateStudentResponseInterface,
  NationalityInterface,
  StateInterface
} from 'src/interfaces/sharedInterfaces'

declare global {
  interface Window {
    database: {
      createStudent: (
        studentData: CreateStudentDataInterface
      ) => Promise<CreateStudentResponseInterface>
      getNationalities: () => Promise<{ success: boolean; data: NationalityInterface }>
      getStates: () => Promise<{ success: boolean; data: StateInterface }>
    }
  }
}
