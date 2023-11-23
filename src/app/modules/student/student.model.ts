import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

//create Schema--------------------------------------------------
// sub schema userNameSchema------
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
    maxLength: [20, 'First Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
  },
});

// sub schema guardian------
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is Required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact number is Required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact number is Required'],
  },
});

// sub schema localGuardian------
const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is Required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is Required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is Required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is Required'],
  },
});

// main schema student------------------------------
const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is Required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact is Required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is Required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is Required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is Required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is Required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian is Required'],
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

//create Model--------------------------------------------------
export const StudentModel = model<Student>('Student', studentSchema);
