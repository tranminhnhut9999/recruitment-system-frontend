export const ROLE_CONFIG: { [index: string]: any } = {
  ADMIN: {
    HOMEPAGE: "/dashboard/staff-management",
  },
  HR_MANAGER: {
    HOMEPAGE: "/dashboard/recruitment",
  },
  HR_STAFF: {
    HOMEPAGE: "/dashboard/recruitment",
  }
}
export enum ROLE {
  ADMIN="ADMIN",
  HR_MANAGER="HR_MANAGER",
  HR_STAFF="HR_STAFF",
}
