const fs = require('fs');
const inquirer = require('inquirer');
import { pool, connectToDb } from './src/connections';

// Connect to the database
connectToDb();

// Function to add a department
const addDepartment = async () => {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:'
    });
    await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
    console.log('Department added successfully!');
};

// Function to add a role
const addRole = async () => {
    const { roleTitle, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID for this role:'
        }
    ]);
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [roleTitle, salary, departmentId]);
    console.log('Role added successfully!');
};

// Function to add an employee
const addEmployee = async () => {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the employee\'s role ID:'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the employee\'s manager ID (or leave blank if none):'
        }
    ]);
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId || null]);
    console.log('Employee added successfully!');
};

// Function to update an employee's role
const updateEmployeeRole = async () => {
    const { employeeId, newRoleId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the employee ID:'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID:'
        }
    ]);
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    console.log('Employee role updated successfully!');
};
