const { pool, connectToDb } = require('./src/connections.js');
const inquirer = require('inquirer');
const fs = require('fs');

// Function to add a department
const addDepartment = async () => {
    try {
        const { departmentName } = await inquirer.prompt({
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:'
        });
        await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
        console.log('Department added successfully!');
    } catch (error) {
        console.error('Error adding department:', error.message);
    }
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

    // Check if the roleId exists
    const roleCheck = await pool.query('SELECT * FROM role WHERE id = $1', [roleId]);
    if (roleCheck.rows.length === 0) {
        console.error('Error: The specified role ID does not exist.');
        return;
    }

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

// Main menu function
const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update Employee Role',
            'Exit'
        ]
    });

    switch (action) {
        case 'Add a Department':
            await addDepartment();
            break;
        case 'Add a Role':
            await addRole();
            break;
        case 'Add an Employee':
            await addEmployee();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    mainMenu();
};

// Connect to the database and start the main menu
connectToDb().then(mainMenu).catch(err => {
    console.error('Failed to start the application:', err);
    process.exit(1);
});
