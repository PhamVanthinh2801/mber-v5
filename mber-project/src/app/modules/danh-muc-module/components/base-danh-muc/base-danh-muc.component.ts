import {Component, Input, OnInit} from '@angular/core';
import {TestService} from "./base-danh-muc.service";

@Component({
  selector: 'app-base-danh-muc',
  templateUrl: './base-danh-muc.component.html',
  styleUrls: ['./base-danh-muc.component.scss']
})
export class BaseDanhMucComponent implements OnInit {
  @Input() header='Test Module'
  @Input() listData: any;
  @Input() cols: any;
  selectedData: any;
  constructor( private testService: TestService) { }
  // cols = [
  //   { field : 'code', header: 'Code' },
  // ];

  ngOnInit(): void {
    // this.testService.getALlThuDi().subscribe((data: any)=> {
    //   this.listData = data.result.items
    //   console.log(data)
    // })
  }

}
