export interface NhanVienModel {
  employeeId?: number,
  organization?: {
    name?: string;
    orgParent?: {
      name?: string;
    }

    sysOrganizationId?: number,
  },
  employeeCode?: string,
  positionName?: string,
  fullName?: string,
  mobilePhone?: string,
  telephone?: string,
  displayName?: string,
  username?: string,
  roles?: string,
}

