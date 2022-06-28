// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
employeesArray = [];

const db = mysql.createConnection(
  {
    user: 'root',
    database: 'employeeTracker_db',
  }
);
const init = () => {

  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'query',
      message: 'What option would you like to select?',
      choices: [
        'View all Employees',
        'View Departments',
        'View Roles',
        'Add Employee',
        'Add Departments',
        'Add Roles',
        'Update Employee Role',
        'exit',
      ]
    }
  ]).then((answers) => {
    switch (answers.query) {
      case 'View all Employees': {
        viewEmployees();
        break;
      }
      case 'View Departments': {
        viewDepartments();
        break;
      }
      case 'View Roles': {
        viewRoles();
        break;
      }
      case 'Add Employee': {
        addEmployee();
        break;
      }
      case 'Add Departments': {
        addDepartment();
        break;
      }
      case 'Add Roles': {
        addRoles();
        break;
      }
      case 'Update Employee Role': {
        updateEmployeeRole();
        break;
      }
      default: {
        process.exit();
      }

    }
  })
};

// to view all Employees information
function viewEmployees() {
  db.query('SELECT * FROM employee', function(err, res) {
      if (err) throw err
      console.table(res)
      choices();
  } )
};
//view different dept
function viewDepartments() {
  db.query('SELECT * FROM department', function(err, res) {
      if (err) throw err
      console.table(res)
      choices();
  })
};
//view different roles
function viewRoles() {
  db.query('SELECT * FROM roles', function (err, res) {
      console.table(res);
      choices();
  })
  
};
// function to add new employee
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is employees first name?',
      name: 'firstName'
    },
    { 
      type: 'input',
      message: 'What is employees last name?',
      name: 'lastName'
    },
    {
      type: 'input',
      message: 'What is employees role id?',
      name: 'roleId'
    },
    {
      type: 'input',
      message: 'What is employees manager id?',
      name: 'managersId'
    }
  ]).then((answers)=>{
    connection.query(`INSERT INTO employee SET ?`,
    {
      first_name: answers.firstName,
      last_name: answers.lastName,
      role_id: answers.roleId,
      manager_id: answers.managersId
    },
    (err) => {
      if (err) throw err;
      console.log('Added employee')
      console.table(answers)
      employeeUpdate()

    })
  })
};
// function to add new department
const addDepartment = () =>{
  inquirer.prompt([
    {
      type: 'input',
      message: 'What department would you like to add?',
      name: 'newDept'
    }
  ]).then((answers) => {
    connection.query(`INSERT INTO employee_Dept SET ?`,
    {
      dept_name: answers.newDept
    },
    (err) => {
      if (err) throw err;
      console.log('Added new Department')
      console.table(answers)
      employeeUpdate()
    })
  })
};
// function to add roles
const addRoles = () =>{
  inquirer.prompt([
    {
      type: 'input',
      message: 'What role would you like to add?',
      name: 'newRole'
    },
    {
      type: 'input',
      message: 'What is the salary?',
      name: 'salary'
    }
  ]).then((answers)=> {
    connection.query(`INSERT INTO employee_Role SET ?`,
    {
      title: answers.newRole,
      salary: answers.salary
    },
    (err) => {
      if (err) throw err;
      console.log('Added new Role')
      console.table(answers)
      employeeUpdate()
    })
  })
}
 
    
    

 


init();

