type role = 'Admin' | 'SuperAdmin' | 'User';
export interface RegisteredUsers {
  email: string;
  name: string;
  pwd: string;
  role: role;
}
