import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialTableComponent } from './material-table/material-table.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


const material = [
  MatToolbarModule,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule
];

@NgModule({
  imports: [material,CommonModule],
  exports: [material,MaterialTableComponent],
  declarations: [
    MaterialTableComponent
  ]
})
export class MaterialModule {

}
