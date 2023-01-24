import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Administrador } from 'src/app/models/administrador';


@Component({
  selector: 'app-details-admin',
  templateUrl: './details-admin.component.html',
  styleUrls: ['./details-admin.component.css']
})
export class DetailsAdminComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public administrador: Administrador) { }

  ngOnInit(): void {
  }

}
