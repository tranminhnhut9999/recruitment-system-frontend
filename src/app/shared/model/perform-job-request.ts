export interface PerformJobRequest {
  department: string;
  title: string;
  description: string | null;
  targetNumber: number;
  salaryRangeFrom: number;
  salaryRangeTo: number;
  keywords: string[];
  endDate: string;
  startDate: string;
  position: string;
  status: boolean;
  requiredExperience: number;
  recruiters: string[];
  jobType: string;
  workingPlace: string;
}
