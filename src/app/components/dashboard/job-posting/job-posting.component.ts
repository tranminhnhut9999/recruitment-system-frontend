import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-job-posting',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.scss']
})
export class JobPostingComponent  implements OnInit {
    jobInformationFormGroup: FormGroup = new FormGroup<any>({
        jobTitle: new FormControl("", Validators.required),
        jobDescription: new FormControl("", Validators.required),
    });
    ngOnInit() {
        this.jobInformationFormGroup.get('jobTitle');
    }
}
