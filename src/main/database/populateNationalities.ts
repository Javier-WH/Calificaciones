import Nationality from './models/nationality'

export async function populateNationalities(): Promise<void> {
  try {
    const nationalitiesToCreate = [
      { nationality: 'Venezolano', active: true },
      { nationality: 'Extranjero', active: true },
      { nationality: 'Carnet Diplomático', active: true },
      { nationality: 'Pasaporte', active: true },
      { nationality: 'Cédula de Estudiantil', active: true }
    ]

    await Nationality.bulkCreate(nationalitiesToCreate, {
      ignoreDuplicates: true
    })
  } catch (error) {
    console.error('Error al poblar la base de datos:', error)
  }
}
