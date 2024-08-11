import {Component, OnInit} from '@angular/core';
import {ProfileResponse} from "../../../shared/model/profile.model";
import {AccountService} from "../../../shared/services/account.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AccountStatus} from "../../../shared/enums/account-status.enum";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit {
  accounts: ProfileResponse[] = [];
  cols: any[] = [];
  shouldShowAccountDetail: boolean = false;
  viewedAccount?: ProfileResponse;
  searchControl = new FormControl('');
  filteredAccounts: ProfileResponse[] = [];

  constructor(private accountService: AccountService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    accountService.loadAccount();
  }

  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'ID'},
      {field: 'firstname', header: 'First Name'},
      {field: 'lastname', header: 'Last Name'},
      {field: 'email', header: 'Email'},
      {field: 'role.roleName', header: 'Role'},
      {field: 'status', header: 'Status'},
      {field: 'actions', header: 'Actions'},

    ];

    this.accountService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
      this.filteredAccounts = this.accounts;
      if (this.shouldShowAccountDetail && this.viewedAccount) {
        this.viewedAccount = this.accounts.find(account => account.id === this.viewedAccount?.id);
      }
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // 1-second delay
      distinctUntilChanged(),
      map((searchTerm) => this.filterProfiles(searchTerm ? searchTerm : ""))
    ).subscribe(filtered => {
      this.filteredAccounts = filtered;
    });
  }

  deactivateAccount(account: ProfileResponse
  ) {
    console.log('Deactivating account', account);
    this.confirmationService.confirm({
      header: "Xác nhận",
      message: "Bạn có muốn vô hiệu có tài khoản này ?",
      acceptLabel: "Xác nhận",
      rejectLabel: "Trở về",
      accept: () => {
        this.accountService.changeStatusAccount({
          email: account.email,
          status: AccountStatus.INACTIVATE
        }).subscribe(response => {
          if (response.status == 'OK') {
            this.accountService.loadAccount();
            this.messageService.add({
              severity: "success",
              detail: "Vô hiệu hóa tài khoản thành công",
              summary: "Thành công"
            })
          } else {
            this.messageService.add({
              severity: "erorr",
              detail: "Vô hiệu hóa tài khoản thất bại",
              summary: "Thất bại"
            })
          }
        });
      },
    })

  }

  activateAccount(account: ProfileResponse) {
    console.log('Activating account', account);
    this.confirmationService.confirm({
      header: "Xác nhận",
      message: "Bạn có muốn kích hoạt tài khoản này ?",
      acceptLabel: "Xác nhận",
      rejectLabel: "Trở về",
      accept: () => {
        this.accountService.changeStatusAccount({
          email: account.email,
          status: AccountStatus.ACTIVATE
        }).subscribe(response => {
          if (response.status == 'OK') {
            this.accountService.loadAccount();
            this.messageService.add({
              severity: "success",
              detail: "Kích hoạt tài khoản thành công",
              summary: "Thành công"
            })
          } else {
            this.messageService.add({
              severity: "erorr",
              detail: "Kích hoạt tài khoản thất bại",
              summary: "Thất bại"
            })
          }
        });
      },
    })
  }

  viewDetails(account: ProfileResponse) {
    // Add your view details logic here
    console.log('Viewing details for', account);
    this.viewedAccount = account;
    this.shouldShowAccountDetail = true;
  }

  filterProfiles(searchTerm: string): ProfileResponse[] {
    if (!searchTerm || searchTerm.length == 0) {
      return this.accounts;
    }

    searchTerm = searchTerm.toLowerCase();

    return this.accounts.filter(profile => {
      const firstname = this.removeDiacritics(profile.firstname).toLowerCase();
      const lastname = this.removeDiacritics(profile.lastname).toLowerCase();
      const email = this.removeDiacritics(profile.email).toLowerCase();

      return firstname.includes(searchTerm) || lastname.includes(searchTerm) || email.includes(searchTerm);
    });
  }

  // Helper function to remove diacritics for Vietnamese search
  removeDiacritics(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  protected readonly AccountStatus = AccountStatus;
}
