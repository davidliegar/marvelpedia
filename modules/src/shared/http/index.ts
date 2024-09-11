import { circuitBreakerService } from '@shared/circuit-breaker'
import { errorReportService } from '@shared/error-report'

import { type HttpService } from './domain/http-service'
import { axiosHttpServiceBuilder } from './infrastructure/axios-http-service'

export const httpService: HttpService = axiosHttpServiceBuilder({
  errorReportService,
  circuitBreakerService
})
