import { ipcMain } from 'electron'
import Students from '../database/models/students'

export default function IPCmain(): void {
  ipcMain.on('ping', async () => {
    const students = await Students.create({
      ci: '123456',
      nationality: 'Colombia',
      name: 'Axioma',
      lastName: 'Vargas',
      gender: 'M',
      birdthDate: '1999-01-01'
    })
  })
}
