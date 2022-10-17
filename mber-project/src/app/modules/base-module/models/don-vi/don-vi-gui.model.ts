export interface DonViModel {
  sysOrganizationId?: number,
  code?: string,
  name?: string,
  orgParentId?: number,
  orgParent?: {
    name?: string,
    orgParent?: {}
  }
  orgAddress?: string
}
