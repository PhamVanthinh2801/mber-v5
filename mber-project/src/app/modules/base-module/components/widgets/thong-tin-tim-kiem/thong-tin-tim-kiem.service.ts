import { Injectable } from '@angular/core';
import {apiServiceBase} from "../../../service/api-service-base";
import * as API from "../../../service/api-gateway";

@Injectable({
  providedIn: 'root'
})
export class ThongTinTimKiemService extends apiServiceBase{
    getDataSearchThuDi(sParam: any){
      return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_THU_DI_THEO_LOAI, sParam);
    }
}
