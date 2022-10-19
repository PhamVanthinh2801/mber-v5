import {DoKhanModel, DoMatModel, DonViModel} from "..";

export interface ThuDenModel {
  id?:number,
  type?: number, //phân loại thư
  isSample?: boolean // thư mẫu
  staff?: object, // nhân viên lấy từ hệ thống đăng nhập
  letterCode?: {
    name?: string,
    code?: string,
    id?: number
  }, // sổ thư đi
  itemCode?:object | any; //Số vận đơn
  documentCode?: string; //Số hiệu văn bản
  code?: number, // Mã thư đi,
  inputDate?: Date, // Ngày nhập
  requestDate?: Date, // Ngày yêu cầu từ
  sendDate?: Date, // Ngày gửi
  dateTo?: Date, //Ngày đến
  sendUnit?: object, // đơn vị gửi
  affiliatedSendUnit?: object, // đơn vị trực thuộc gửi
  ext?: string, //Máy lẻ
  receiveTime?: Date, //Thời gian nhận
  note?: string, //Ghi chú
  sender?: {
    employeeId?: number
  }, // người gửi
  summary?: string, // trích yếu
  securityLevel?: DoMatModel, // độ mật
  urgencyLevel?: DoKhanModel, // độ khẩn
  receivePlace?: object, // Nơi nhận,
  receiveUnit?: DonViModel,  // đơn vị nhận
  outSiteReceive?: object, // Nơi nhận bên ngoài
  affiliatedReceiveUnit?: object, // đơn vị trực thuộc nhận
  recipient?: {
    employeeId?: number
  }, // Người nhận
  mobilePhone?: string, // Số điện thoại,
  receiveAddress?: string // địa chỉ nhận
  status?: number // trạng thái của thư
}
