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
const viewEmployees = () => {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
  FROM employee 
  LEFT JOIN employee manager ON manager.id = employee.manager_id
  INNER JOIN employee_Role ON employee.role_id = employee_Role.id
  INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id;`, function (err, results) {
    if (err) return console.error(err);
    'console.table'(results);
    return init();
  });
};
//view different dept
const viewDepartments = () => {
  db.query(`SELECT dept_name FROM employee_Dept`, function (err, results) {
    if (err) return console.error(err);
    'console.table'(results);
    return init();
  });
};
//view different roles
const viewRoles = () => {
  db.query(`SELECT title FROM employee_Role`, function (err, results) {
    if (err) return console.error(err);
    'console.table'(results);
    return init();
  });
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
 // function to push into empty array 
 employeesArray = [];
    db.query ('SELECT first_name FROM employees');
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({first_name}) => {
            employeesArray.push(first_name);
        });
    });
    

 


init();

