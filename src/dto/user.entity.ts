export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  following?: User[];
  followedBy?: User[];
  created: Date;
}
