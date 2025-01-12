INSERT INTO department (id, name)
VALUES (1, 'sales'),
       (2, 'engineering'),
       (3, 'finance'),
       (4, 'legal');

INSERT INTO role (id, title, salary, department)
values (1, 'sales lead', 100000, 1),
		(2, 'salesperson', 80000, 1),
		(3, 'lead engineer', 150000, 2),
		(4, 'software engineer', 120000, 2),
		(5, 'account manager', 160000, 3),
		(6, 'accountant', 125000, 3),
		(7, 'legal team lead', 250000, 4),
		(8, 'lawyer', 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
values (1, 'John', 'Doe', 1, NULL),
		(2, 'Jane', 'Smith', 2, 1),
		(3, 'Alice', 'Johnson', 3, NULL),
		(4, 'Bob', 'Brown', 4, 3),
		(5, 'Charlie', 'Davis', 5, NULL),
		(6, 'Eve', 'Wilson', 6, 5);