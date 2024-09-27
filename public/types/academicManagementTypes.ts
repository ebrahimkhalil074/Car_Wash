export type TAcademicSemester = {
    _id: string;
    name: string;
    year: string;
    code: string;
    startMonth: string;
    endMonth: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  export type TItem ={
    _id: string,
    name:string,
    academicFaculty: {
      _id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      __v: number
    },
    createdAt: string,
      updatedAt: string,
  }