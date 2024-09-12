export type AnalyticsEventType =
  | 'action_search_superhero'

export interface AnalyticsEvent {
  type: AnalyticsEventType
  payload: Record<string, unknown>
}
