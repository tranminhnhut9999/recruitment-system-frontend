export interface JobResponse {
  id: number;
  department: string;
  title: string;
  description: string;
  targetNumber: number;
  salaryRangeFrom: number;
  salaryRangeTo: number;
  keywords: string[];
  endDate: string;
  startDate: string;
  position: string;
  status: boolean;
  requiredExperience: number;
  jobType: string,
  workingPlace: string;
  recruiters: string[];
}
