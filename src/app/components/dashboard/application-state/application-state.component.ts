import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dictionary} from "../../../shared/model/dictionary";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-application-state',
  templateUrl: './application-state.component.html',
  styleUrls: ['./application-state.component.scss']
})
export class ApplicationStateComponent {
  @Input({required: true}) state: string = "";
  @Input() applications: any[] = [];
  @Output() downloadFileEmmiter = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  // Mapping of state values to labels
  private stateLabels: Dictionary<string> = {
    'APPLYING': 'Chưa Xử Lý',
    'EXECUTING': 'Đang Xử Lý',
    'REJECTED': 'Đã Từ Chối',
    'CONTRACTING': 'Đang Đợi Hợp Đồng',
    'INTERVIEWING': 'Đang Phỏng Vấn',
    'ACCEPTED': 'Đã Chấp Nhận'
  };

  getStateLabel(state: string): string {
    return this.stateLabels[state] || state;
  }

  downloadFile(url: string) {
    let urlParts: string[] = url.split("/");
    let fileName: string = urlParts[urlParts.length - 1];

    this.http.get(url, {responseType: 'blob'}).subscribe((blob: Blob) => {
      const link = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
