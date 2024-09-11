
export type AuthService = {
  getToken(): Promise<string | undefined>
}
