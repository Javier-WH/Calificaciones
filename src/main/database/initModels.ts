import { getSequelizeInstance } from './connect'
import { initStudentsModel } from './models/students'
import { ErrorDialogOptions, showDialog } from '../errorHandler/dialogs'

export default async function InitModels(app): Promise<void> {
  const sequelizeInstance = await getSequelizeInstance(app)

  if (sequelizeInstance) {
    console.log('Inicializando modelos...')
    initStudentsModel(sequelizeInstance)

    try {
      await sequelizeInstance.sync()
      console.log(
        'Todos los modelos fueron sincronizados exitosamente (tablas creadas/actualizadas).'
      )
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
