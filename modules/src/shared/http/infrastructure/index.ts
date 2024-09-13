import { HttpService } from "../domain/httpService";
import { axiosHttpServiceBuilder } from "./axiosHttpService";

export const httpService: HttpService = (() => axiosHttpServiceBuilder())()