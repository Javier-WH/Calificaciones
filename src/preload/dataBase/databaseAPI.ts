/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron'
import { CreateStudentDataInterface } from '../../interfaces/sharedInterfaces'

export default function databaseAPI(): void {
  contextBridge.exposeInMainWorld('database', {
    createStudent: (
      studentData: CreateStudentDataInterface
    ): Promise<{ success: boolean; data: any }> => {
      return ipcRenderer.invoke('db:createStudent', studentData)
    },

    getNationalities: (): Promise<{ success: boolean; data: any }> => {
      return ipcRenderer.invoke('db:getNationality')
    },
    getStates: (): Promise<{ success: boolean; data: any }> => {
      return ipcRenderer.invoke('db:getStates')
    }
  })
}
