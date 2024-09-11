import { env } from '@marvelpedia/config'

import { type AuthService } from '../domain/auth-service'

export function marvelAuthServiceBuilder () : AuthService {
  return {
    getToken() {
      return Promise.resolve(env.API_KEY)
    }
  }
}
