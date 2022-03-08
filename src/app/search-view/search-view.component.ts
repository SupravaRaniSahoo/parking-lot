import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  id!:number;
  vehicle!: Vehicle;
  vehicles!: Vehicle[];
  name: any;

  constructor(private router: ActivatedRoute, private service: VehicleService, private routers: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(){
    this.service.getVehicleList().subscribe(
      data =>{
        this.vehicles = data;
  });
}

  backFunction(){
    this.routers.navigate(['/search']);
  }

}
