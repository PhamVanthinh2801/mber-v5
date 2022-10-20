import { Component, OnInit } from '@angular/core';
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {DoKhanModel} from "../../../base-module/models";

@Component({
  selector: 'app-do-khan',
  templateUrl: './do-khan.component.html',
  styleUrls: ['./do-khan.component.scss']
})
export class DoKhanComponent implements OnInit {
  listUrgency: DoKhanModel[];
  showAdd = false;
  cols = [
    {field: 'id', header: 'Mã code', style: 'width: 6%; text-align: center'},
    {field: 'name', header: 'Tên độ mật', style: 'width: auto; text-align: center'},
  ]
  constructor(private shareApi: SharedApi) { }

  ngOnInit(): void {
    this.shareApi.getDoKhan().subscribe((data: any) => {
      this.listUrgency = data.result.items
    })
  }

  addUrgency(ev: any){
    console.log(ev)
    if(ev=='true'){
      this.showAdd = true;
    }
  }
}
