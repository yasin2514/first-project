import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // built in ---------------- static method--------------
  if (await StudentModel.isStudentExists(studentData.id)) {
    throw new Error('Student already exists!');
  }
  const result = await StudentModel.create(studentData);

  // built in --------------- instance method---------------
  // const student = new StudentModel(studentData);
  // if (await student.isStudentExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save();

  return result;
};

//get student all data---------
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

//get single student data---------
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

// delete student from DB----
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
