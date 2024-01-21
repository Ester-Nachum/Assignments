export interface Assignment {
    id: number, assignmentType: number
    , name: string, description: string,
    startDate: Date, endDate: Date, isRecurring: boolean, isCompleted: boolean
}



// {
//     "id": 0,
//     "assignmentType": 2,
//     "name": "clean schol",
//     "description": "string",
//     "startDate": "2023-11-26T12:51:33.114Z",
//     "endDate": "2023-11-26T12:51:33.114Z",
//     "isRecurring": true,
//     "isCompleted": false
//   }


// assignment.service.ts:33 {"id":0,"assignmentType":"Work","name":"עוגת פוטיפור דבש","description":"","startDate":"2023-11-25T22:00:00.000Z","endDate":"1999-12-31T22:00:00.000Z","isRecurring":false,"isCompleted":false}