import { bool, cleanEnv, str } from 'envalid'

import { variables } from './variables'

export interface EnvironmentVariables {
  ENVIRONMENT: 'development' | 'production'
  API_URL: string
  DEV_MODE: boolean
  ANALYTICS_SERVICE: 'debug'
}

export const env: EnvironmentVariables = cleanEnv(variables, {
  ENVIRONMENT: str({
    choices: ['development', 'production']
  }),
  API_URL: str(),
  DEV_MODE: bool(),
  ANALYTICS_SERVICE: str({
    choices: ['debug']
  }),
}) as EnvironmentVariables

if (env.DEV_MODE) {
  console.log('%cDEV MODE', 'font-size: 16px; color: red', '')
}
