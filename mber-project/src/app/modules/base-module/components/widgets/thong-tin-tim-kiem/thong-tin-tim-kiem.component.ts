import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DonViModel, ThuDiModel} from "../../../models";
import {ThongTinTimKiemService} from "./thong-tin-tim-kiem.service";
import {SharedApi} from "../../../service/api.shared.services";

@Component({
  selector: 'app-thong-tin-tim-kiem',
  templateUrl: './thong-tin-tim-kiem.component.html',
  styleUrls: ['./thong-tin-tim-kiem.component.scss']
})
export class ThongTinTimKiemComponent implements OnInit {
  years = [{year: 2017}, {year: 2018}, {year: 2019}, {year: 2020}, {year: 2021}, {year: 2022}]
  listUnit: ThuDiModel[];
  keyword: string;
  selectedUnit: ThuDiModel;
  selectionYear: any;
  @Input() status: number;
  @Output() dataResponse: EventEmitter<any> = new EventEmitter<any>();

  constructor(private thongTinTimKiemService: ThongTinTimKiemService, private shareAPI: SharedApi) {
    this.selectionYear = this.years[this.years.length - 1]
  }

  ngOnInit(): void {
    console.log('child', this.status)
    console.log('child listUnit', this.listUnit)
    console.log('child', this.selectedUnit)
    console.log('child', this.selectionYear)
    console.log('child', this.keyword)
    this.shareAPI.getAllDonVi().subscribe(data => {
      this.listUnit = data.result.items;
    })
  }



  onSearch() {
    const param = {
      status: this.status,
      organizationId: this.selectedUnit ? this.selectedUnit : null,
      year: this.selectionYear,
      keyword: this.keyword
    }
    this.thongTinTimKiemService.getDataSearchThuDi(param).subscribe((data: any) => {
      this.dataResponse.emit(data.result.content)
    })
  }
}
