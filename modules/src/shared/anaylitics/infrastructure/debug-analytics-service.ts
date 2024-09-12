
import { type AnalyticsEvent } from '../domain/analytics-event'
import { type AnalyticsService } from '../domain/analytics-service'

export function debugAnalyticsBuilder (): AnalyticsService {
  return {
    track: (event: AnalyticsEvent) => { console.log('[Analytics Track]', event) }
  }
}
