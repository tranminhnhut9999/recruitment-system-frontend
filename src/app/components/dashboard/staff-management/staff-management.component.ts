import {Component, OnInit} from '@angular/core';
import {ProfileResponse} from "../../../shared/model/account.model";
import {AccountService} from "../../../shared/services/account.service";

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit {
  accounts: ProfileResponse[] = [];
  cols: any[] = [];

  constructor(private accountService: AccountService) {
    accountService.loadAccount();
  }

  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'firstname', header: 'First Name'},
      {field: 'lastname', header: 'Last Name'},
      {field: 'email', header: 'Email'},
      {field: 'role.roleName', header: 'Role'},
      {field: 'actions', header: 'Actions'}
    ];

    this.accountService.accounts$.subscribe(accounts => this.accounts = accounts);
  }

  deactivateAccount(account: ProfileResponse) {
    // Add your deactivate logic here
    console.log('Deactivating account', account);
  }

  viewDetails(account: ProfileResponse) {
    // Add your view details logic here
    console.log('Viewing details for', account);
  }
}
