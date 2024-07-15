// Interface for StatusLogResponse
import {ApplyStatus} from "../types/type.definition";

export interface StatusLogResponse {
  id: number;
  status: ApplyStatus;
  createTime: string; // Assuming Instant is stored as an ISO string
  note: string;
}
