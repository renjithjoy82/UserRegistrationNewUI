import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserregService } from '../service/userreg.service';
import { UserRegistration } from '../user-registration';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { StateList } from '../statelist';

interface State {
  StateId: string;
  StateName: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  dataSaved = false;
  userregForm: any;
  allUsers: Observable<UserRegistration[]> | undefined;
  dataSource: MatTableDataSource<UserRegistration> | undefined;
  selection = new SelectionModel<UserRegistration>(true, []);
  userIdUpdate = null;
  massage = null;
  allState: Observable<StateList[]> | any;
  StateId = "";
  SelectedDate = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['select', 'FirstName', 'LastName', 'DateofBirth', 'Address', 'State', 'Edit', 'Delete'];

  constructor(private formbulider: FormBuilder, private userregService: UserregService, private _snackBar: MatSnackBar, public dialog: MatDialog) { 
   
  }

  ngOnInit(): void {
    this.userregForm = this.formbulider.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      DateofBirth: ['', [Validators.required]],
      Address: ['', [Validators.required]],      
      State: ['', [Validators.required]]
    });
    
    this.FillStateDDL();
  }

  FillStateDDL() {
    this.allState = this.userregService.getStates();    
  }
   
    onFormSubmit() {
      this.dataSaved = false;
      const user = this.userregForm.value;
      this.CreateUser(user);
      this.userregForm.reset();
    }

    CreateUser(user: UserRegistration) {
      console.log(user.DateofBirth);
      
        user.StateId = this.StateId;
   
        this.userregService.addUser(user).subscribe(
          () => {
            this.dataSaved = true;
            this.SavedSuccessful(1);
            this.userregForm.reset();
          }
        );
    }    

    resetForm() {
      this.userregForm.reset();
      this.massage = null;
      this.dataSaved = false;
    }

    SavedSuccessful(isUpdate: number) {
      if (isUpdate == 1) {        
        this._snackBar.open('Record Saved Successfully!', 'Close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    }
  }
