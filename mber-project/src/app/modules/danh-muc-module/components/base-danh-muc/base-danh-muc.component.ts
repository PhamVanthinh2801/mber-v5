import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-base-danh-muc',
  templateUrl: './base-danh-muc.component.html',
  styleUrls: ['./base-danh-muc.component.scss']
})
export class BaseDanhMucComponent implements OnInit {
  selectedData: any;
  @Input() isFunction = false;
  @Input() listData: any;
  @Input() cols: any;
  @Output() idData: EventEmitter<number> = new EventEmitter<number>();
  @Output() isClickDelete : EventEmitter<any> = new EventEmitter<any>();
  @Output() isClickAdd : EventEmitter<any> = new EventEmitter<any>();
  @Output() isClickEdited : EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }
  ngOnInit(): void {
  }
  onRowSelect(ev) {
    this.idData.emit(this.selectedData)
  }
  deletedData() {
    this.isClickDelete.emit('true')
  }
  addDate() {
    this.isClickAdd.emit('true')
  }
  editedData(){
    this.isClickEdited.emit('true')
  }
}
