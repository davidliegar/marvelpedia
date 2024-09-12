import { bool, cleanEnv, str } from 'envalid'

import { variables } from './variables'

export interface EnvironmentVariables {
  ENVIRONMENT: 'development' | 'production'
  API_URL: string
  DEV_MODE: boolean
  ANALYTICS_SERVICE: 'debug'
  API_KEY: string
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
  API_KEY: str()
}) as EnvironmentVariables