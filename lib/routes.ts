/**
 * Centralized route constants for the CarbonMax application.
 * Use these constants instead of hardcoded route strings.
 */

export const ROUTES = {
  /** Home page - Changi app with CarbonMax banner */
  HOME: '/',
  
  /** CarbonMax quest hub */
  CARBONMAX: '/carbonmax',
  
  /** Quest detail page */
  QUEST: (id: string) => `/quest/${id}`,
  
  /** Chat page */
  CHAT: '/chat',
  
  /** Impact page */
  IMPACT: '/impact',
  
  /** Green Tiers page */
  TIERS: '/tiers',
} as const;

/**
 * Helper function to get quest route
 * @example ROUTES.QUEST('jewel-green-plate') => '/quest/jewel-green-plate'
 */
export function getQuestRoute(id: string): string {
  return ROUTES.QUEST(id);
}

