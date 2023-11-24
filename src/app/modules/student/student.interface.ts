import { Model } from 'mongoose';

// sub type UserName----------
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// sub type Guardian----------
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

// sub type LocalGuardian---------
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// main type Student--------------------
export type TStudent = {
  id: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};

export type TStudentMethods = {
  isStudentExists(id: string): Promise<TStudent | null>;
};

export type TStudentModel = Model<
  TStudent,
  Record<string, never>,
  TStudentMethods
>;
