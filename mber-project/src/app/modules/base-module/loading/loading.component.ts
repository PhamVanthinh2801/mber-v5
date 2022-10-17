import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }
  @Input() isLoading = false;
  ngOnInit(): void {
  }
}
