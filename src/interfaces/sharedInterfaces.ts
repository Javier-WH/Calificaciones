// interfaces de los estudiantes
export interface CreateStudentDataInterface {
  ci: string
  nationality_id: string
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

// interfaces de nacionalidades
export interface NationalityInterface {
  id: string
  nationality: string
  active?: boolean
}

export interface CreateNationalityResponseInterface {
  success: boolean
  message: string
  data?: NationalityInterface[]
}

//interfaces de los estados
export interface StateInterface {
  id: string
  state: string
  active?: boolean
}

export interface CreateStateResponseInterface {
  success: boolean
  message: string
  data?: StateInterface[]
}
