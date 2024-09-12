
import { type HttpService } from './domain/httpService'
import { axiosHttpServiceBuilder } from './infrastructure/axiosHttpService'

export const httpService: HttpService = axiosHttpServiceBuilder()
