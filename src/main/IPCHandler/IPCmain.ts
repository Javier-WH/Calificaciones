import { ipcMain } from 'electron'

export default function IPCmain(): void {
  ipcMain.on('ping', () => console.log('pong'))
}
