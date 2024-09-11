import { AuthService } from "../domain/auth-service";
import { marvelAuthServiceBuilder } from "./marvel-auth-service";

export const authService: AuthService = (() => {
  return marvelAuthServiceBuilder()
})()