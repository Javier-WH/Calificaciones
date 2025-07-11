import {
  CountryInterface,
  CreateStudentDataInterface,
  CreateStudentResponseInterface,
  MunicipalityInterface,
  NationalityInterface,
  ParishInterface,
  StateInterface
} from 'src/interfaces/sharedInterfaces'

declare global {
  interface Window {
    database: {
      createStudent: (
        studentData: CreateStudentDataInterface
      ) => Promise<CreateStudentResponseInterface>
      getNationalities: () => Promise<{ success: boolean; data: NationalityInterface }>
      getCountries: () => Promise<{ success: boolean; data: CountryInterface }>
      getStates: () => Promise<{ success: boolean; data: StateInterface }>
      getMunicipalities: () => Promise<{ success: boolean; data: MunicipalityInterface }>
      getParishes: () => Promise<{ success: boolean; data: ParishInterface }>
    }
  }
}
