import {Component} from '@angular/core';
import {JobOverviewModel} from "../../../shared/model/job-overview.model";

@Component({
    selector: 'app-recruitment',
    templateUrl: './recruitment.component.html',
    styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent {
    selectedJobOverview: JobOverviewModel[] = [];
    jobOverviews: JobOverviewModel[] = [
        {
            id: "1",
            name: "Software Engineer",
            department: "Engineering",
            targetCandidate: 5,
            candidateNumber: 1
        },
        {
            id: "2",
            name: "Product Manager",
            department: "Product",
            targetCandidate: 3,
            candidateNumber: 1
        },
        {
            id: "3",
            name: "Data Scientist",
            department: "Data",
            targetCandidate: 4,
            candidateNumber: 3
        },
        {
            id: "4",
            name: "Marketing Specialist",
            department: "Marketing",
            targetCandidate: 2,
            candidateNumber: 2
        },
        {
            id: "5",
            name: "UX Designer",
            department: "Design",
            targetCandidate: 3,
            candidateNumber: 2
        }
    ];
}
