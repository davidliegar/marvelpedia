
export interface AuthService {
  getToken(): Promise<string | undefined>
}
