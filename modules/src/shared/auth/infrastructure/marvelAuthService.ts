import { env } from '@marvelpedia/config'

import { type AuthService } from '../domain/authService'

export function marvelAuthServiceBuilder () : AuthService {
  return {
    getToken() {
      return Promise.resolve(env.API_KEY)
    }
  }
}
