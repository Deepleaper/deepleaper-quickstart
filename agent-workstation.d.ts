declare module 'agent-workstation' {
  export function getCategories(): Array<{ name: string; roles: string[] }>;
  export function getRole(category: string, name: string): any;
  export function getIndustries(): any[];
  export function searchRoles(query: string): any[];
  export function validateRole(role: any): any;
  export function getPopularRoles(): any[];
}
