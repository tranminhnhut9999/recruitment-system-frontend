import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-job-posting',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.scss']
})
export class JobPostingComponent implements OnInit {
    jobInformationFormGroup: FormGroup = new FormGroup<any>({
        jobTitle: new FormControl("", Validators.required),
        jobDescription: new FormControl("", Validators.required),
    });
    constructor(private location: Location, private confirmService: ConfirmationService)
    {}
    ngOnInit() {
        this.jobInformationFormGroup.get('jobTitle');
    }

    departments: any[] = [{value: "Bộ phận IT"}, {value: "Bộ phận kế toán"}, {value: "Bộ phận bảo vệ"}, {value: "Bộ phận bán hàng"}]
    workingPlaces: any[] = [{value: "1460 Đ. Võ Văn Kiệt, Phường 1, Quận 6, Thành phố Hồ Chí Minh"}, {value: "Đường Nguyễn Văn Cừ, Hoà Hiệp Bắc, Liên Chiểu, Đà Nẵng"}, {value: "273 Nguyễn Tri Phương, Hòa Thuận Đông, Hải Châu, Đà Nẵng 550000"}]
    jobTypes: any[] = [{value: "Thời vụ"}, {value: "Bán thời gian"}, {value: "Toàn thời gian"}]
    interviewers: any[] = [{value: "Phạm Khánh Toàn"}, {value: "Thư Nguyễn"}, {value: "Dương Đình Trọng"}, {value: "Tiến Cường"}]
    recruiters: any[] = [{value: "Phạm Khánh Toàn"}, {value: "Thư Nguyễn"}, {value: "Dương Đình Trọng"}, {value: "Tiến Cường"}]
    skillKeywords: any[] =[
        { "value": "JavaScript" },
        { "value": "Python" },
        { "value": "Java" },
        { "value": "C#" },
        { "value": "PHP" },
        { "value": "C++" },
        { "value": "Ruby" },
        { "value": "Swift" },
        { "value": "Objective-C" },
        { "value": "Kotlin" },
        { "value": "HTML" },
        { "value": "CSS" },
        { "value": "SQL" },
        { "value": "NoSQL" },
        { "value": "MongoDB" },
        { "value": "PostgreSQL" },
        { "value": "MySQL" },
        { "value": "AWS" },
        { "value": "Azure" },
        { "value": "Google Cloud Platform" },
        { "value": "DevOps" },
        { "value": "Docker" },
        { "value": "Kubernetes" },
        { "value": "Terraform" },
        { "value": "Ansible" },
        { "value": "Puppet" },
        { "value": "Jenkins" },
        { "value": "Git" },
        { "value": "GitHub" },
        { "value": "Bitbucket" },
        { "value": "Agile" },
        { "value": "Scrum" },
        { "value": "Kanban" },
        { "value": "Lean" },
        { "value": "Project Management" },
        { "value": "Product Management" },
        { "value": "Business Analysis" },
        { "value": "Data Analysis" },
        { "value": "Data Science" },
        { "value": "Machine Learning" },
        { "value": "Deep Learning" },
        { "value": "Artificial Intelligence" },
        { "value": "Natural Language Processing" },
        { "value": "Computer Vision" },
        { "value": "Big Data" },
        { "value": "Hadoop" },
        { "value": "Spark" },
        { "value": "Tableau" },
        { "value": "Power BI" },
        { "value": "Excel" },
        { "value": "VBA" },
        { "value": "R" },
        { "value": "MATLAB" },
        { "value": "SAS" },
        { "value": "Stata" },
        { "value": "SPSS" },
        { "value": "Marketing" },
        { "value": "Digital Marketing" },
        { "value": "SEO" },
        { "value": "SEM" },
        { "value": "Content Marketing" },
        { "value": "Social Media Marketing" },
        { "value": "Email Marketing" },
        { "value": "Marketing Automation" },
        { "value": "Sales" },
        { "value": "CRM" },
        { "value": "Salesforce" },
        { "value": "HubSpot" },
        { "value": "Zoho" },
        { "value": "Customer Service" },
        { "value": "Technical Support" },
        { "value": "IT Support" },
        { "value": "Networking" },
        { "value": "Information Security" },
        { "value": "Cybersecurity" },
        { "value": "Penetration Testing" },
        { "value": "Compliance" },
        { "value": "Risk Management" },
        { "value": "Governance" },
        { "value": "Ethical Hacking" },
        { "value": "Forensics" },
        { "value": "Cloud Security" },
        { "value": "Mobile Development" },
        { "value": "iOS Development" },
        { "value": "Android Development" },
        { "value": "React Native" },
        { "value": "Flutter" },
        { "value": "Web Development" },
        { "value": "Front-End Development" },
        { "value": "Back-End Development" },
        { "value": "Full-Stack Development" },
        { "value": "UI/UX Design" },
        { "value": "Graphic Design" },
        { "value": "Interaction Design" },
        { "value": "User Research" },
        { "value": "Usability Testing" },
        { "value": "Wireframing" },
        { "value": "Prototyping" },
        { "value": "Figma" },
        { "value": "Sketch" },
        { "value": "Adobe XD" },
        { "value": "Adobe Photoshop" },
        { "value": "Adobe Illustrator" },
        { "value": "Adobe InDesign" },
        { "value": "3D Modeling" },
        { "value": "Animation" },
        { "value": "Video Editing" },
        { "value": "Audio Editing" },
        { "value": "Motion Graphics" },
        { "value": "Copywriting" },
        { "value": "Technical Writing" },
        { "value": "Creative Writing" },
        { "value": "Translation" },
        { "value": "Localization" },
        { "value": "Proofreading" },
        { "value": "Editing" },
        { "value": "Public Relations" },
        { "value": "Event Planning" },
        { "value": "Human Resources" },
        { "value": "Recruiting" },
        { "value": "Talent Acquisition" },
        { "value": "Employee Relations" },
        { "value": "Performance Management" },
        { "value": "Training and Development" },
        { "value": "Compensation and Benefits" },
        { "value": "Labor Law" },
        { "value": "Payroll" },
        { "value": "Accounting" },
        { "value": "Financial Analysis" },
        { "value": "Financial Reporting" },
        { "value": "Budgeting" },
        { "value": "Forecasting" },
        { "value": "Bookkeeping" },
        { "value": "Tax Preparation" },
        { "value": "Audit" },
        { "value": "Risk Assessment" },
        { "value": "Internal Controls" },
        { "value": "Treasury" },
        { "value": "Supply Chain Management" },
        { "value": "Logistics" },
        { "value": "Procurement" },
        { "value": "Inventory Management" },
        { "value": "Operations Management" },
        { "value": "Quality Assurance" },
        { "value": "Quality Control" },
        { "value": "Manufacturing" },
        { "value": "Production Planning" },
        { "value": "Lean Manufacturing" },
        { "value": "Six Sigma" },
        { "value": "Process Improvement" },
        { "value": "Strategic Planning" },
        { "value": "Change Management" },
        { "value": "Organizational Development" },
        { "value": "Negotiation" },
        { "value": "Conflict Resolution" },
        { "value": "Leadership" },
        { "value": "Team Building" },
        { "value": "Time Management" },
        { "value": "Communication" },
        { "value": "Public Speaking" },
        { "value": "Presentation Skills" },
        { "value": "Customer Relationship Management" },
        { "value": "Client Management" },
        { "value": "Stakeholder Management" },
        { "value": "Vendor Management" },
        { "value": "Contract Management" },
        { "value": "Legal Research" },
        { "value": "Litigation" },
        { "value": "Compliance" },
        { "value": "Intellectual Property" },
        { "value": "Real Estate" },
        { "value": "Corporate Law" },
        { "value": "Employment Law" },
        { "value": "Health and Safety" },
        { "value": "Environmental Regulations" },
        { "value": "Policy Development" },
        { "value": "Strategic Communications" },
        { "value": "Public Policy" },
        { "value": "Government Relations" },
        { "value": "Community Engagement" },
        { "value": "Nonprofit Management" },
        { "value": "Grant Writing" },
        { "value": "Fundraising" },
        { "value": "Volunteer Management" },
        { "value": "Educational Programming" },
        { "value": "Curriculum Development" },
        { "value": "Instructional Design" },
        { "value": "Teaching" },
        { "value": "Training Delivery" },
        { "value": "eLearning" },
        { "value": "Distance Learning" },
        { "value": "Classroom Management" },
        { "value": "Student Assessment" },
        { "value": "Career Counseling" },
        { "value": "Academic Advising" },
        { "value": "Library Science" }
    ];

    handleClickingBack() {
        this.confirmService.confirm({
            message: 'Trở về sẽ mất dữ liệu chưa lưu trữ, bạn có muốn trở về ? ',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            acceptLabel: "Xác nhận",
            rejectLabel: "Hủy",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.location.back();
            }
        });
    }
}