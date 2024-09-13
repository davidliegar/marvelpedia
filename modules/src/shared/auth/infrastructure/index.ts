import { AuthService } from "../domain/authService";
import { marvelAuthServiceBuilder } from "./marvelAuthService";

export const authService: AuthService = (() => marvelAuthServiceBuilder())()