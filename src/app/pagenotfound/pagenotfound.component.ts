import { Component, OnInit } from '@angular/core';
import { SystembolagetService } from '../services/systembolaget.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  imgSrc='';
  constructor(private service: SystembolagetService) { }

  ngOnInit() {
  }

  getImg() {
    this.service.getImg().subscribe((res) => {
      console.warn(res);
      //this.imgSrc = res.body;
    });
  }

}
