import { type AnalyticsService } from './domain/analytics-service'
import { debugAnalyticsBuilder } from './infrastructure/debug-analytics-service'

export const analyticsService: AnalyticsService = (() => {
  return debugAnalyticsBuilder()
})()
