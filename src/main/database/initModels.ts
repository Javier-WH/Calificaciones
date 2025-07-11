import { getSequelizeInstance } from './connect'
import { initStudentsModel } from './models/students'
import { initNationalityModel } from './models/nationality'
import { initStatesModel } from './models/states'
import { initParishesModel } from './models/parish'
import { initMunicipalitiesModel } from './models/municipality'
import { initCountriesModel } from './models/countries'
import { ErrorDialogOptions, showDialog } from '../errorHandler/dialogs'
import { populateVenezuelaData } from './autoFillStates'
import { populateCountriesData } from './populateCountries'
import { populateNationalities } from './populateNationalities'

export default async function InitModels(app): Promise<void> {
  const sequelizeInstance = await getSequelizeInstance(app)

  if (sequelizeInstance) {
    console.log('Inicializando modelos...')

    initCountriesModel(sequelizeInstance)
    initStatesModel(sequelizeInstance)
    initMunicipalitiesModel(sequelizeInstance)
    initParishesModel(sequelizeInstance)
    initNationalityModel(sequelizeInstance)
    initStudentsModel(sequelizeInstance)

    try {
      await sequelizeInstance.sync()
      console.log(
        'Todos los modelos fueron sincronizados exitosamente (tablas creadas/actualizadas).'
      )

      await populateVenezuelaData()
      await populateCountriesData()
      await populateNationalities()
    } catch (error) {
      console.error('Error al sincronizar los modelos: ', error)
      const errorDialogOptions: ErrorDialogOptions = {
        message: 'No se pudieron sincronizar los modelos.',
        title: 'Error de la Aplicación',
        type: 'error',
        buttons: ['OK']
      }
      await showDialog(errorDialogOptions)
      app.quit()
    }
  } else {
    console.error('No se pudo obtener la instancia de Sequelize, modelos no inicializados.')
    const errorDialogOptions: ErrorDialogOptions = {
      message: 'No se pudo obtener la instancia de Sequelize.',
      title: 'Error de la Aplicación',
      type: 'error',
      buttons: ['OK']
    }
    await showDialog(errorDialogOptions)
    app.quit()
  }
}
