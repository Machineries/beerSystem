import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  header = 'Hello world';
  dynamicName = 'JALI';
  constructor() { }

  ngOnInit() {
  }

  onClickLink() {
    console.warn('YOU CLICKED LINK');
    this.dynamicName = 'Beef jerkey';
  }

}
