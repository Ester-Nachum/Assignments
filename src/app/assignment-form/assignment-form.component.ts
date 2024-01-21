import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Assignment } from '../Models/Assignment';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {
  assignmentForm!: FormGroup;
  assignmentTypes!: string[];

  constructor(private fb: FormBuilder, private router: Router, private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    this.assignmentService.GetAssignmentTypes().subscribe((response) => {
      this.assignmentTypes = response;
    }, (error) => {
      console.log(error);
    })
    this.buildForm();
  }

  buildForm() {
    this.assignmentForm = this.fb.group({
      assignmentType: [null, Validators.required],
      name: ['', Validators.required],
      description: [''],
      startDate: [null, Validators.required],
      endDate: [null],
      isRecurring: [false],
      isCompleted: [false]
    });
  }

  onSubmit() {
    if (this.assignmentForm.valid) {
      //convert item in enum from string to number 
      var type = this.assignmentTypes.indexOf(this.assignmentForm.value.assignmentType);
      if (type == -1)
        console.log("Error in convert the enum");

      // Create a new Assignment object with the form values
      const formattedData: Assignment = {
        id: 0,
        assignmentType: type,
        name: this.assignmentForm.value.name,
        description: this.assignmentForm.value.description,
        startDate: this.assignmentForm.value.startDate,
        endDate: this.assignmentForm.value.endDate,
        isRecurring: this.assignmentForm.value.isRecurring,
        isCompleted: this.assignmentForm.value.isCompleted
      };

      console.log('Formatted Data:', formattedData);

      this.assignmentService.CreateAssignment(formattedData).subscribe(
        (response) => {
          console.log('Success:', response);
          this.navigateAssignmentsTable();
        });

    } else {
      console.log("The form is not valid.");
    }
  }

  navigateAssignmentsTable() {
    this.router.navigate(['/assignment-table']);
  }
}
