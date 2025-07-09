// electron/dialogs.ts
import { dialog, BrowserWindow } from 'electron'

export interface ErrorDialogOptions {
  message: string
  title?: string
  type?: 'info' | 'warning' | 'error'
  buttons?: string[]
}

/**
 * Displays an error dialog with the specified message and options.
 *
 * @param {Object} options - The options for the error dialog.
 * @param {string} options.message - The message to display in the dialog.
 * @param {string} [options.title='Error de la Aplicación'] - The title of the dialog.
 * @param {'info' | 'warning' | 'error'} [options.type='error'] - The type of dialog to display.
 * @param {string[]} [options.buttons=['OK']] - The buttons to display in the dialog.
 * @returns {Promise<void>} A promise that resolves when the dialog is closed.
 */

export async function showDialog({
  message,
  title = 'Error de la Aplicación',
  type = 'error',
  buttons = ['OK']
}: ErrorDialogOptions): Promise<void> {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  const targetWindow =
    focusedWindow ||
    (BrowserWindow.getAllWindows().length > 0 ? BrowserWindow.getAllWindows()[0] : null)

  if (!targetWindow) {
    console.error(
      `No se pudo mostrar el diálogo de error: ${message}. No hay ventanas disponibles.`
    )
    return
  }

  try {
    await dialog.showMessageBox(targetWindow, {
      type,
      title,
      message: message,
      buttons
    })
    console.log('Cuadro de diálogo de error mostrado y cerrado.')
  } catch (error) {
    console.error('Error al intentar mostrar el cuadro de diálogo de error:', error)
  }
}
