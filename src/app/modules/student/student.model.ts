import validator from 'validator';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // TStudentMethods,
  TStudentModel,
  TUserName,
} from './student.interface';
import config from '../../config';
// import { any, number } from 'joi';

//create Schema--------------------------------------------------
// sub schema userNameSchema------
const userNameSchema = new Schema<TUserName>({
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
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

// sub schema guardian------
const guardianSchema = new Schema<TGuardian>({
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
const localGuardianSchema = new Schema<TLocalGuardian>({
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
//for custom -----------instance method-------------
// const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>({});

//for custom -----------static method-------------
const studentSchema = new Schema<TStudent, TStudentModel>({
  id: {
    type: String,
    required: [true, 'Id is Required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    unique: true,
    maxLength: [20, 'Password can not be more than 20 characters'],
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
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid',
    },
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

//pre save middleware / hook
studentSchema.pre('save', async function (next) {
  console.log(this, 'pre hook: we will save the data');
  // hashing password and save into DB--
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware / hook
studentSchema.post('save', function () {
  console.log(this, 'post hook: we saved our data');
});

//create custom -------------instance method-----------------
// studentSchema.methods.isStudentExists = async function (id: string) {
//   return await StudentModel.findOne({ id });
// };

//create custom -------------static method-----------------
studentSchema.statics.isStudentExists = async function (id: string) {
  return await StudentModel.findOne({ id });
};

//create Model--------------------------------------------------
export const StudentModel = model<TStudent, TStudentModel>(
  'Student',
  studentSchema,
);
