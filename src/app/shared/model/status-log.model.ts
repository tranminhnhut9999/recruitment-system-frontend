// Interface for StatusLogResponse
import {JobStatus} from "../types/type.definition";

export interface StatusLogResponse {
  id: number;
  status: JobStatus;
  createTime: string; // Assuming Instant is stored as an ISO string
  note: string;
}
