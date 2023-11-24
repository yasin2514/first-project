import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.zod.validation';
import errorMap from 'zod/lib/locales/en';
// import studentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //data validation using ---------joi-----------
    // const { error, value } = studentValidationSchema.validate(studentData);
    // const result = await StudentService.createStudentIntoDB(value);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something Went to Wrong',
    //     error: error.details,
    //   });
    // }

    //data validation using -----------zod-----------
    const zodParseData = studentValidationSchema.parse(studentData);
    const result = await StudentService.createStudentIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went to Wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went to Wrong',
      error: err,
    });
  }
};

// get single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went to Wrong',
      error: err,
    });
  }
};

// delete student
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is delete successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went to Wrong',
      error: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
