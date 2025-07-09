import { Sequelize } from 'sequelize'
import { showDialog, ErrorDialogOptions } from '../errorHandler/dialogs'
import path from 'path'

import { app, type App } from 'electron'
let sequelizeInstance: Sequelize | null = null

/**
 * Creates a Sequelize instance and connects to the database.
 * If the connection is already established, it just returns the instance.
 * If there is an error connecting, it shows an error dialog and quits the app.
 * @param app The electron app instance.
 * @returns The Sequelize instance, or null if there was an error.
 */
async function getSequelizeInstance(app: App): Promise<Sequelize | null> {
  if (sequelizeInstance) {
    return sequelizeInstance
  }

  console.log('Conecting to the database...')
  sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    //C:\Users\Axioma\AppData\Roaming\notasbatalla
    storage: path.join(app.getPath('userData'), 'database.sqlite'),
    logging: false
  })

  try {
    await sequelizeInstance.authenticate()
    console.log('Database connected successfully.')
  } catch (error) {
    console.error('Error connecting to the database: ', error)
    sequelizeInstance = null

    const errorDialogOptions: ErrorDialogOptions = {
      message: 'No se pudo conectar a la base de datos.',
      title: 'Error de la Aplicación',
      type: 'error',
      buttons: ['OK']
    }
    await showDialog(errorDialogOptions)
    app.quit()
  }

  return sequelizeInstance
}

/**
 * Disconnects the Sequelize instance from the database.
 * If the connection is not established, it only logs a message.
 * If there is an error disconnecting, it shows an error dialog and quits the app.
 */
async function disconnectSequelize(): Promise<void> {
  if (sequelizeInstance) {
    try {
      await sequelizeInstance.close()
      console.log('Database disconnected successfully.')
      sequelizeInstance = null
    } catch (error) {
      console.error('Error disconnecting from the database: ', error)
      const errorDialogOptions: ErrorDialogOptions = {
        message: 'No se pudo desconectar a la base de datos.',
        title: 'Error de la Aplicación',
        type: 'error',
        buttons: ['OK']
      }
      await showDialog(errorDialogOptions)
      app.quit()
    }
  } else {
    console.log('Database is not connected.')
  }
}

export { getSequelizeInstance, disconnectSequelize }
