import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Item } from './data.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PWA';
  items: Array<Item>;

  constructor(private dataService : DataService, private swUpdate: SwUpdate) {}
  ngOnInit(){
    this.fetchData();

    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(() => {
        if(confirm("New version available. Load New version ?")){
          window.location.reload();
        }
      })
    }
  }
  fetchData(){
    this.dataService.fetch().subscribe((data: Array<Item>) => {
      console.log(data);
      this.items = data;
    }, console.log);
  }
}
