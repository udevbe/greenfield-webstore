import AppConfigContext from './Context'
import { useContext } from 'react'

export const useAppConfig = () => useContext(AppConfigContext)
export { default } from './AppConfigProvider.js'
