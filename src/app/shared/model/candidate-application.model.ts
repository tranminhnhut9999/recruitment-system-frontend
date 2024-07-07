import {JobStatus} from "../types/type.definition";
import {StatusLogResponse} from "./status-log.model";

export interface CandidateApplication {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // Assuming Instant is stored as an ISO string
  address: string;
  cvUrl: string;
  jobId: number;
  applyDate: string; // Assuming Instant is stored as an ISO string
  interviewer: string;
  status: JobStatus;
  statusLogs: StatusLogResponse[];
}
