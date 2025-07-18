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

//interface de los paises
export interface CountryInterface {
  id: string
  country: string
  active?: boolean
}

export interface CreateCountryResponseInterface {
  success: boolean
  message: string
  data?: CountryInterface[]
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

// interfaces de municipios
export interface MunicipalityInterface {
  id: string
  state_id: string
  municipality: string
  active?: boolean
}

export interface CreateMunicipalityResponseInterface {
  success: boolean
  message: string
  data?: MunicipalityInterface[]
}

// interfaces de parroquias
export interface ParishInterface {
  id: string
  municipality_id: string
  parish: string
  active?: boolean
}

export interface CreateParishResponseInterface {
  success: boolean
  message: string
  data?: ParishInterface[]
}
