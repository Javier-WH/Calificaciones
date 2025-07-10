import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import databaseAPI from './dataBase/databaseAPI'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    databaseAPI()
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
