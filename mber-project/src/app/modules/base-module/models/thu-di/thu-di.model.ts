import {DonViChuyenPhatModel, DonViModel, NhanVienModel, NoiNhanBenNgoaiModel} from "..";

export interface ThuDiModel {
  id?:number,
  type?: number, //phân loại thư
  isSample?: boolean // thư mẫu
  staff?: object, // nhân viên lấy từ hệ thống đăng nhập
  letterCode?: object | any, // sổ thư đi
  code?: number, // Mã thư đi,
  inputDate?: Date, // Ngày nhập
  sendDate?: Date, // Ngày gửi
  sendUnit?: object, // đơn vị gửi
  affiliatedSendUnit?: {
    sysOrganizationId?: number
  }, // đơn vị trực thuộc gửi
  itemCode?: object, // Số vận đơn
  sender?: {
    employeeId?: number
  }, // người gửi
  textCode?: string, // Số hiệu văn bản
  summary?: string, // trích yếu
  securityLevel?: {
    id?: number
  }, // độ mật
  urgencyLevel?: {
    id?: number
  }, // độ khẩn
  receivePlace?: DonViModel,// Nơi nhận,
  receiveUnit?: DonViModel,  // đơn vị nhận
  outSiteReceive?: NoiNhanBenNgoaiModel, // Nơi nhận bên ngoài
  affiliatedReceiveUnit?: DonViModel, // đơn vị trực thuộc nhận
  deliveryUnit?:DonViChuyenPhatModel,
  recipient?: NhanVienModel, // Người nhận
  mobilePhone?: string, // Số điện thoại,
  receiveAddress?: string // địa chỉ nhận
  status?: number // trạng thái của thư
  cost?:number;
}
