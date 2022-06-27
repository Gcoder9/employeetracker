INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Alexa', 'Tyler', 4, 6), ('Aubree', 'Sky', 1, 8), ('Channing', 'Gabriel', 9, null), ('Kase', 'Chambers', 4, 3), ('Cassie', 'Haven', 7, null), ('Ron', 'Burgundy', 6, null), ('Tom', 'Cruise', 2, 7), ('Christina', 'Milian', 6, 9);

INSERT INTO employee_Role(title, salary, department_id)
VALUES ('Sales lead', 100000, 1), ('Sales person', 75000, 1), ('Lead engineer', 180000, 2), ('Software engineer', 130000, 2), ('Accountant', 125000, 3), ('Legal team lead', 260000, 4), ('Lawyer', 200000, 4);

INSERT INTO employee_Dept(dept_name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
FROM employees 
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_Role ON employee.role_id = employee_Role.id
INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id;

SELECT dept_name FROM employee_Dept;

SELECT title FROM employee_Role