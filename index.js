// Your code here
//creating employee record
// Your code here

// Creating employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour, // This is how much is earned per hour
        timeInEvents: [],
        timeOutEvents: [],
    };
}

// Creating multiple employee records
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Adding a time-in event
function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date,
    });
    return employeeRecord;
}

// Adding a time-out event
function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date,
    });
    return employeeRecord;
}

// Calculating hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, dateStamp) {
    // Time to log in to work
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === dateStamp);
    // Time logged out of work
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === dateStamp);
    // We need to find the logging and logout time; otherwise, there's an error
    if (!timeInEvent || !timeOutEvent) {
        throw new Error("Missing time-in or time-out event for the given date.");
    }
    // Getting the start time and end time of the employee
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
    // Calculating hours worked by subtraction
    const hoursWorked = (timeOutHour - timeInHour) / 100;

    return hoursWorked;
}

// Calculating wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    // Finding hours worked
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    // Determining how much she earned
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
}

// Calculating total wages for all dates
function allWagesFor(employeeRecord) {
    // Dates Polly worked
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    // Total earned
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0); 

    return totalWages;
}

// Calculating total payroll for all employees
function calculatePayroll(employeeRecords) {
    // Using reduce to loop through each employee and calculate total payroll
    //reduce helps start from 0
    const totalPayroll = employeeRecords.reduce((total, employee) => {
        const employeeWages = allWagesFor(employee);
        return total + employeeWages;
    }, 0); 

    return totalPayroll;
}

// Example to understand Polly's and Kylian's salaries better

let totalWages = allWagesFor(employees);
console.log(totalWages); 


let employees = [
    {
        firstName: 'Polly',
        familyName: 'Nyaribari',
        title: 'Web Developer',
        payPerHour: 20,
        timeInEvents: [
            { 
                type: 'TimeIn', 
                hour: 900, 
                date: '2025-02-03' 
            },
            { 
                type: 'TimeIn', 
                hour: 800, 
                date: '2025-02-06' 
            }
        ],
        timeOutEvents: [
            { 
                type: 'TimeOut', 
                hour: 1700, 
                date: '2025-02-03' 
            },
            { 
                type: 'TimeOut', 
                hour: 1600, 
                date: '2025-02-06' 
            }
        ]
    },
    {
        firstName: 'Kylian',
        familyName: 'Raini',
        title: 'Architect',
        payPerHour: 25,
        timeInEvents: [
            { 
                type: 'TimeIn', 
                hour: 1000, 
                date: '2025-02-04' 
            },
            { 
                type: 'TimeIn', 
                hour: 900, 
                date: '2025-02-10' 
            }
        ],
        timeOutEvents: [
            { 
                type: 'TimeOut', 
                hour: 1800, 
                date: '2025-02-04' 
            },
            { 
                type: 'TimeOut', 
                hour: 1700, 
                date: '2025-02-10' 
            }
        ]
    }
];
const totalPayroll = calculatePayroll(employees);
console.log(totalPayroll);