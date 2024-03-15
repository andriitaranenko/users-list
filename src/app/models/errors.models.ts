export interface CustomError {
  code: number;
  message: string;
}

export const errorMessages = {
  required: 'is required',
  usernameTaken: 'Username is taken',
  email: 'Invalid email',
  invalidPassword:
    'Password should have at least 8 characters, one letter and one number',
  repeatPassword: 'Repeat password should be the same as password',
};
