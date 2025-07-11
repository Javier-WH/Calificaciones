export interface CreateStudentDataInterface {
  ci: string
  nationality: string
  name: string
  lastName: string
  gender: string
  birdthDate: string
}

export interface CreateStudentResponseInterface {
  success: boolean
  message: string
  data?: CreateStudentDataInterface
}

export interface NationalityInterface {
  id: string
  nationality: string
}

export interface CreateNationalityResponseInterface {
  success: boolean
  message: string
  data?: NationalityInterface[]
}
