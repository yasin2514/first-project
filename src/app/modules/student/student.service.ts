import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData); //built in ----------static----------- method
  const student = new Student(studentData); //built in ------instance --------------method create instance
  if (await student.isUserExists(student.id)) {
    throw new Error('User already exists!');
  }
  const result = await student.save();
  return result;
};

//get student all data---------
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
