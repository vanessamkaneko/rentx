interface ICreateUserDTO {
  name: string | undefined;
  password: string | undefined;
  email: string | undefined;
  driver_license: string | undefined;
  id?: string;
  avatar?: string;
  isAdmin?: boolean;
}

export { ICreateUserDTO }
