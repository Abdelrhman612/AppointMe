export interface User {
  id?: string;
  FirstName?: string;
  LastName?: string;
  email?: string;
  password?: string;
  appointmints?: Appointmints[];
}
export interface Appointmints {
  id: string;
  date: Date;
  status: string;
  userId: string;
}
