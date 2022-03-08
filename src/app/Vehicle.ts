import { Details } from './Details';

export class Vehicle {
    parkingId!:number;
    name!:string;
    vehicleNumber!:string;
    category!:string;
    entryTime!:Date;
    detailsDTO!:Details;
    status!:string;
    exitTime = localStorage.getItem("getExitTime");
}