import { Component, OnInit } from '@angular/core';
import { Shelving } from '../../models/shelving';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-shelvings',
  templateUrl: './shelvings.component.html',
  styleUrls: ['./shelvings.component.sass']
})
export class ShelvingsComponent implements OnInit {

  shelvings: Shelving[];
  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.showShelvings();
  }

  showShelvings() {
    this.shelvings = this.data.getShelvings();
  }

}
