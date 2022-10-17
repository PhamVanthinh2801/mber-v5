import {environment} from "../../../../environments/environment";
export class PHAN_HE {
  public static AUTH = 'auth/'
  public static THU_DEN = 'mailing/letter-to/'
  public static THU_DI = 'mailing/letter-from/'
  public static DON_VI =  'mailing/organizations/'
  public static EMPLOYEE = 'mailing/employees/'
  public static DO_KHAN = 'mailing/categories/urgency-levels/'
  public static DO_MAT = 'mailing/categories/security-levels/'
  public static DANH_MUC_SO_THU_DEN = 'mailing/categories/letter-from-notebooks/'
  public static DON_VI_CHUYEN_PHAT = 'mailing/categories/delivery-units/'
  public static NOI_NHAN_BEN_NGOAI = 'mailing/categories/out-site-receives/'
}
// @ts-ignore
export class API_LOGIN {
  public static LOGIN = 'login'
}

export class API_NOI_NHAN_BEN_NGOAI {
  public static GET_ALL_NOI_NHAN_BEN_NGOAI = 'get-all'
}

export class API_DON_VI_CHUYEN_PHAT {
  public static GET_ALL_DON_VI_CHUYEN_PHAT = 'get-all'
}

export class API_DO_MAT {
  public static GET_ALL_DO_MAT = 'get-all'
}

export class API_DO_KHAN {
  public static GET_ALL_DO_KHAN = 'get-all'
}

export class API_DON_VI {
  public static GET_ALL_DON_VI = 'get-all'
  public static GET_DON_VI_BY_ID = 'get-by-parent-id/'
}
// API THƯ ĐẾN
export class API_THU_DEN {
  public static GET_ALL_THU_MOI = 'get-all'
  public static CREATE_THU_MOI = 'create'
  public static GET_LETTER_PAGE = 'page'
  public static DELETE_LETTER_TO = 'permanently-deleted/'
  public static UPDATE_LETTER_TO = 'update/'

}

export class API_THU_DI {
  public static GET_THU_DANG_SOAN = 'thu-dang-soan'
  public static GET_ALL_THU_DI = 'get-all'
  public static ADD_THU_DI = 'create'
  public static UPDATE_THU_DI = 'update'
  public static GET_THU_DI_THEO_LOAI = 'page';
  public static GEN_CODE = 'gen-code'
  public static DELETED = 'permanently-deleted';
}
export class API_DANH_MUC_SO_THU_DEN {
  public static GET_ALL_DANH_MUC_SO_THU_DEN = 'get-all'
}

export class API_EMPLOYEE {
  public static GET_ALL_EMPLOYEE = 'get-all'
  public static GET_EMPLOYEE_BY_ID_ORG = 'get-by-org-id/'
  public static GET_EMPLOYEE_BY_ID = 'get-by-id/'
}

// @ts-ignore
export class SERVICE_GATEWAY {
  public static GETWAY = environment.getway;
}
