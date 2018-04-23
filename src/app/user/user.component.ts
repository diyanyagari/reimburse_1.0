import { Component, OnInit, Inject, Input} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
// import { User, Query } from '../types';
import 'rxjs/add/operator/map';
import { UsersService } from '../users.service';
import { DataSource } from '@angular/cdk/collections';
import { User } from '../user.model';
import 'rxjs/add/operator/filter';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
                                 
      animal: string;
      name: string;

   constructor(private usersService: UsersService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog){
     iconRegistry.addSvgIcon(
        'create',sanitizer.bypassSecurityTrustResourceUrl('../assets/ic_border_color_white_18px.svg'));
     iconRegistry.addSvgIcon(
        'remove',sanitizer.bypassSecurityTrustResourceUrl('../assets/ic_remove_white_18px.svg'));
   }
   dataSource = new UserDataSource(this.usersService);
   displayedColumns = ['name','email','role','customColumn1'];

   
 
   // applyFilter(filterValue: string) {
   //    filterValue = filterValue.trim(); // Remove whitespace
   //    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   //    // this.dataSource.filter = filterValue;
   //  }
 

   openDialog(): void {
      let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '400px',
        data: { name: this.name, animal: this.animal }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

  ngOnInit() {
  }

}

export class UserDataSource extends DataSource<any> {
  constructor(private usersService: UsersService){
    super();
  }
  connect(): Observable<User[]> {
    return this.usersService.getUser();
  }
  disconnect() {}
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    private apollo: Apollo,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreate(name, email, password, role){
    return this.usersService.newUser(name, email, password, role),
    console.log(name, email, password, role),
    this.dialogRef.close();
  }
}