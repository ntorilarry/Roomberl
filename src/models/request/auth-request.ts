export interface signUpRequest {
  password2: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  hostel: string;
  address: string;
  gender: string;
  groups: [];
  userPermissions: [];
}

export interface loginRequest {
  email: string;
  password: string;
}

export interface signUpAddInfoRequest {
  otherName: string;
  guardianFullName: string;
  ghanaCardNumber: string;
  courseOfStudy: string;
  dateOfBirth: string;
  guardianPhone: string;
  studentIdNumber: string;
  dateOfAdmission: string;
  user: string;
}


export interface updateRoomTypeRequest {
  roomType: string;

}

export interface UpdateRoomTypeParams {
  body: updateRoomTypeRequest;
  userId: string;
}