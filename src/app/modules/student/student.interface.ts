// sub type UserName----------
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// sub type Guardian----------
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

// sub type LocalGuardian---------
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// main type Student--------------------
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
