export interface User {
  id_usuario: string;
  id_escola?: string;
  name?: string;
  email?: string;
  senha?: string;
  tipo?: string;

 
  [key: string]: unknown;
}
