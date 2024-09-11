import { HttpService } from "../domain/http-service";
import { axiosHttpServiceBuilder } from "./axios-http-service";

export const httpService: HttpService = (() => {
  return axiosHttpServiceBuilder()
})()