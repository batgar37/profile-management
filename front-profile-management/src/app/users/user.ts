import { TypeUser } from '../type-users/type-user';

export interface User {
  id: number;
  name: string;
  email: string;
  typeUser: TypeUser;
}
