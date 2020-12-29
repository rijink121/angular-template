import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class MembersComponent implements OnInit {

  dataSource = [];
  displayedColumns = ['id', 'image', 'name', 'category', 'price', 'quantity', 'active'];

  constructor() { }

  ngOnInit(): void {
  }

}
