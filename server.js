// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection(
  {
    user: 'root',
    database: 'employeeTracker_db',
  }
);

const fn = (options) => {
  if (options === 'exit') return process.exit();

  const query = 'SELECT * FROM students' + (('enrolled' in options) ? ' WHERE ?' : '');

  db.query(query, options, function (err, results) {
    if (err) return console.error(err);
    console.table(results);
    return init();
  });
};

const init = () => {
  const choices = [
    { name: 'Show All Students', value: {} },
    { name: 'Show Enrolled Students', value: { enrolled: 1 } },
    { name: 'Show Unenrolled Students', value: { enrolled: 0 } },
    { name: 'Exit', value: 'exit' },
  ];

  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'query',
      message: 'What option would you like to select?',
      choices,
    }
  ]).then((answers) => fn(answers.query));
};

init();

