import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  val: number = 3;
  
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {}, 1500);
  }

}
