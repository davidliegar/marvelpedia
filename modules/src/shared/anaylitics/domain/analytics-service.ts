
import { type AnalyticsEvent } from './analytics-event'

export interface AnalyticsService {
  track(event: AnalyticsEvent): void
}
