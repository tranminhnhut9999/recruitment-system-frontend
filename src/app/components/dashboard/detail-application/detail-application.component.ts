import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobService} from "../../../shared/services/job.service";
import {CandidateApplication} from "../../../shared/model/candidate-application.model";
import {MessageService} from "primeng/api";
import {Dictionary} from "../../../shared/model/dictionary";

@Component({
  selector: 'app-detail-application',
  templateUrl: './detail-application.component.html',
  styleUrls: ['./detail-application.component.scss']
})
export class DetailApplicationComponent implements OnInit {
  applicationStates: { label: string, value: string }[] = []
  currentSelectItem: { label: string; value: string; } | undefined;
  oldSelectItem: { label: string; value: string; } | undefined;
  applicationId: any;
  application: CandidateApplication | undefined;
  isVisibleChangeStatusDialog: boolean = false;
  statusChangeLog: string = "";
  changeStatus?: { label: string; value: string; };
  currentIndex: number = 0;
  willSendMail: boolean = false;
  emailContent: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private jobService: JobService,
              private messageService: MessageService,
              private ctr: ChangeDetectorRef) {
    this.initApplicationState();
    this.applicationId = activatedRoute.snapshot.paramMap.get("applicationId");
  }

  initApplicationState() {
    this.applicationStates.push({label: "Chưa Xử Lý", value: "APPLYING"});
    this.applicationStates.push({label: "Đang Xử Lý", value: "EXECUTING"});
    this.applicationStates.push({label: "Đã Từ Chối", value: "REJECTED"});
    this.applicationStates.push({label: "Đang Đợi Hợp Đồng", value: "CONTRACTING"});
    this.applicationStates.push({label: "Đang Phỏng Vấn", value: "INTERVIEWING"});
    this.applicationStates.push({label: "Đã Chấp Nhận", value: "ACCEPTED"});
  }

  ngOnInit() {
    this.getApplicationDetail();
  }

  private getApplicationDetail() {
    this.jobService.getCandidateApplicationById(this.applicationId).subscribe(response => {
      this.application = response.data;
      this.currentSelectItem = this.findCurrentState(this.application?.status);
      this.oldSelectItem = this.currentSelectItem;
    });
  }

  handleOnChangeStatus(event: any) {
    let changingState = event.value;
    console.log(changingState)
    let result = this.canProceedToNextStep(this.application?.status, changingState.value);
    console.log("RESULT:", result)
    if (result.isValid) {
      this.isVisibleChangeStatusDialog = true;
      this.changeStatus = changingState;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: "Thất bại",
        detail: result.errorMsg
      });

      // If remove timeout, it not work because some problem related to detection cycle
      setTimeout(() => this.currentSelectItem = this.findCurrentState(this.oldSelectItem?.value), 100)
    }
  }

  resetDialogState() {
    this.statusChangeLog = "";
    this.changeStatus = undefined;
    this.isVisibleChangeStatusDialog = false;
    this.revertStateBackToSelecting();
    this.emailContent = "";
    this.willSendMail = false;
  }

  handleAcceptChange() {
    if (!this.changeStatus) return;
    let params = {
      status: this.changeStatus.value,
      note: this.statusChangeLog,
      isSendMail: this.willSendMail,
      mailContent: this.emailContent
    }
    this.jobService.changeStatusApplicationById(this.applicationId, params).subscribe(response => {
      let status = response.status;
      if (status === "OK") {
        this.messageService.add({
          severity: "success",
          detail: "Change status successful",
          summary: "Success"
        });
        this.getApplicationDetail();
      } else {
        this.messageService.add({
          severity: "error",
          detail: "Change status fail",
          summary: "Failed"
        });
        this.revertStateBackToSelecting();
      }
    })
    this.resetDialogState();
  }

  findCurrentState(state: string = "") {
    for (let i = 0; i < this.applicationStates.length; i++) {
      let applicationState = this.applicationStates[i];
      if (applicationState.value === state) {
        this.currentIndex = i;
        this.currentSelectItem = applicationState;
        console.log("Current State", applicationState);
        return applicationState;
      }
    }
    return undefined;
  }

  canProceedToNextStep(currentState: string = "", nextState: string = ""): { errorMsg: string, isValid: boolean } {
    // Update hasLeftApplyingState flag
    if (currentState !== "APPLYING" && nextState == "APPLYING") {
      return {errorMsg: "Không thể chuyển trạng thái trở lại 'Đang xử lý'", isValid: false};
    }
    switch (currentState) {
      case "APPLYING":
        return {errorMsg: "Chỉ có thể chuyên từ 'Chưa xử lý' sang 'Đang xử lý'", isValid: nextState === "EXECUTING"};
      // Can move to EXECUTING
      case "EXECUTING":
        return {
          errorMsg: "Chỉ có thể chuyển trạng thái từ 'Đang xử lý' thành 'Đang phỏng vấn' hoặc 'Đang ký hợp đồng'",
          isValid: nextState === "INTERVIEWING" || nextState === "CONTRACTING" || nextState === "REJECTED"
        }; // Can move to INTERVIEWING or CONTRACTING
      case "INTERVIEWING":
        return {
          errorMsg: "Chỉ có thể chuyển trạng thái từ 'Đang phỏng vấn' thành 'Đang đợi ký hợp đồng'",
          isValid: nextState === "CONTRACTING"
        } // Can move to CONTRACTING
      case "CONTRACTING":
        return {
          errorMsg: "Chỉ có thể chuyển trạng thái từ 'Đang đợi hợp đồng' thành 'Chấp nhận'",
          isValid: nextState === "ACCEPTED"
        } // Can move to ACCEPTED
      case "ACCEPTED":
        return {errorMsg: "Không thể thay đổi trạng thái", isValid: nextState != "APPLYING"}; // Final state, cannot move further
      case "REJECTED":
        return {errorMsg: "Không thể thay đổi trạng thái", isValid: nextState != "APPLYING"}; // Rejected, cannot move further
      default:
        return {errorMsg: "Trạng thái không hợp lệ", isValid: false}; // Unknown state
    }
  }

  revertStateBackToSelecting() {
    if (this.oldSelectItem) {
      console.log("REVERT:" + this.oldSelectItem.label)
      this.currentSelectItem = this.oldSelectItem;
    }
  }

}
