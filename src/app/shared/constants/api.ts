const BASE_URL_AUTH = "http://localhost:8080/api";
const BASE_URL_JOBS = "http://localhost:8080/api";
const BASE_URL_APPLICATIONS = "http://localhost:8080/api";

export const API_URL = {
  AUTH: {
    LOGIN: `${BASE_URL_AUTH}/auth/login`,
    GET_HR_STAFF: `${BASE_URL_AUTH}/accounts/recruiters`,
    CHANGE_PASSWORD: `${BASE_URL_AUTH}/accounts/password`,
  },
  JOBS: {
    GET_JOBS: `${BASE_URL_JOBS}/jobs`,
    GET_HIRING_JOB: `${BASE_URL_JOBS}/jobs/hiring`,
    CREATE_JOB: `${BASE_URL_JOBS}/jobs`,
    UPDATE_JOB: `${BASE_URL_JOBS}/jobs`,
    DELETE_JOB: `${BASE_URL_JOBS}/jobs`,
  },
  APPLICATIONS: {
    CREATE_APPLICATION: `${BASE_URL_APPLICATIONS}/applications`,
    GET_APPLICATION: `${BASE_URL_APPLICATIONS}/applications`,
    CREATE_STATUS_APPLICATION: (id: number) => `${BASE_URL_APPLICATIONS}/applications/${id}/status`,
  },
};
