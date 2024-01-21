import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Assignment } from '../Models/Assignment';
import { AssignmentService } from '../services/assignment.service';
import Swal from 'sweetalert2'
import { PageEvent } from '../Models/PageEvent';


@Component({
  selector: 'app-assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.css']
})
export class AssignmentsTableComponent implements OnInit {
  constructor(private router: Router, private assingment: AssignmentService, private cdRef: ChangeDetectorRef) { }
  tasks: Assignment[] = [];
  tempLstTasks: Assignment[] = [];
  assignmentTypes: string[] = ['Personal', 'Work', 'Study'];
  ID!: number;
  countRecords!: number;
  page!: number;
  first: number = 0;
  rows: number = 7;

  ngOnInit(): void {
    this.GetAllAssignments();
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.page = event.page + 1;
    this.rows = event.rows;
    console.log(event.pageCount, event, this.rows)
    this.GetAllAssignments();
  }


  GetAllAssignments() {
    this.assingment.GetAllAssignments(this.page, this.rows).subscribe((result) => {
      this.tasks = result.assignments;
      this.tempLstTasks = result.assignments;
      this.countRecords = result.count;
      console.log(result);
    },
      (error) => {
        console.log(error);
        this.loadDemoTasks();
      });
  }

  loadDemoTasks() {
    // Hardcoded demo tasks
    this.tasks = [
      {
        id: 1,
        assignmentType: 1,
        name: 'Task 1',
        description: 'Description for Task 1',
        startDate: new Date('2023-11-15'),
        endDate: new Date('2023-11-20'),
        isRecurring: false,
        isCompleted: false,
      },
      {
        id: 2,
        assignmentType: 2,
        name: 'Task 2',
        description: 'Description for Task 2',
        startDate: new Date('2023-11-18'),
        endDate: new Date('2023-11-25'),
        isRecurring: true,
        isCompleted: true,
      },
      // Add more demo tasks as needed
    ];
  }

  filterByID() {
    if (this.ID) {
      this.assingment.GetAssignmentById(this.ID).subscribe((result) => {
        this.tasks = [result];
      })
      //this.tasks = this.tempLstTasks.filter(a => a.id.toString().includes(this.ID.toString()));
    }
    else
      this.tasks = [...this.tempLstTasks];
  }

  UpdateAssignmentComplated(task: Assignment) {
    if (task.isCompleted) {
      this.assingment.UpdateAssignmentComplated(task.id).subscribe((result) => {
        task.isCompleted = result;
        this.cdRef.detectChanges();
      },
        (error) => {
          console.error(error);
        })
    }
  }

  deleteAssignment(taskId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.assingment.DeleteAssignment(taskId).subscribe((res) => {
          if (res) {
            Swal.fire({
              title: "Deleted!",
              text: `The ${taskId} assignment has been deleted.`,
              icon: "success"
            });
            this.tasks = res;
            this.tempLstTasks = res;
          }
        },
          (error) => {
            console.error(error);
          })
      }
    });
  }

  navigateAssignmentsForm() {
    this.router.navigate(['/assignment-form'])
  }
}
