interface RoleResponse {
  // Define properties of RoleResponse based on its Java definition
  id: number;
  roleName: string;
}

export interface ProfileResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: RoleResponse;
  status: string; // Assuming EAccountStatus.ACTIVATE is a string enum value
  compPhone: string;
  perPhone: string;
  workingPlace: string;
  perAddress1: string;
  perAddress2: string;
  citizenID: string;
  emergencyContactName: string;
  emergencyPhoneNumber: string;
  avatarImg: string;
  eduLevelCode: string;
  eduLevelDescription: string;
  genderCode: string;
  genderDescription: string;
}
