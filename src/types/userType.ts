import { Document } from 'mongoose';

export interface ReturnType<T> {
  success: boolean;
  status: number;
  message: string;
  data: T | string | null;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserReturnType {
  userId: string;
  userName: string;
  userEmail: string;
  token: string;
}

export interface UserDocument extends CreateUserInput, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
