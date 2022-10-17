import { Injectable } from '@angular/core';
import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";


@Injectable({
  providedIn: 'root'
})
export class TatCaService extends apiServiceBase{

  getAllThuMoi(){
    return this.getData(API.PHAN_HE.THU_DEN, API.API_THU_DEN.GET_ALL_THU_MOI);
  }
}
