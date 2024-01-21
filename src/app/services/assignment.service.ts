import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Assignment } from '../Models/Assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseUrl = 'https://localhost:7031';
  constructor(private http: HttpClient) { }

  GetAllAssignments(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllAssignments?pageNumber=${pageNumber}&&pageSize=${pageSize}`).pipe(
      map((data) => {
        return data;
      }),

      catchError((error) => {
        // Handle error
        console.error('Error:', error);
        throw error;
      })
    );
  }

  GetIdAssignments() {
    return this.http.get(`${this.baseUrl}/GetIdAssignments`).subscribe((data) => { return data; },
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    )
  }

  GetAssignmentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAssignmentById?id=${id}`).pipe(
      map((data) => {
        return data;
      }), catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    )
  }

  CreateAssignment(assignmentDTO: Assignment): Observable<any> {
    return this.http.post<Assignment[]>(`${this.baseUrl}/createAssignment`, assignmentDTO)
      .pipe(
        map((data) => {
          return data;
        }), catchError((error) => {
          console.error('Error', error);
          throw error;
        })
      )
  }

  DeleteAssignment(id: number): Observable<any> {
    return this.http.post<boolean>(`${this.baseUrl}/DeleteAssignment?id=${id}`, id).pipe(
      // map((data) => {
      //   console.log(data, " is delete");
      //   return data;
      // }),
      catchError((error) => {
        console.error(error);
        return error;
      })
    )
  }

  GetAssignmentTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAssignmentTypes`).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        console.error(error);
        return error;
      })
    )
  }

  UpdateAssignmentComplated(IDAssignment: number): Observable<any> {
    return this.http.post<boolean>(`${this.baseUrl}/UpdateAssignmentComplated?IDAssignment=${IDAssignment}`, IDAssignment).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        console.error(error);
        return error;
      })
    )
  }

}

