export interface User {
  id: string,
  name: string,
  token: string, // perhaps move to its own slice
  isLoggedIn: boolean // perhaps move to its own slice
}