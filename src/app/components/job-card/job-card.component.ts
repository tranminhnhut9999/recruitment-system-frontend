import {Component, Input} from '@angular/core';
import {Job} from "../../shared/model/job";

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  @Input({required: true}) job!: Job;
  values: any[] = ["Hồ Chí Minh", "Ứng tuyeenr"]
}
