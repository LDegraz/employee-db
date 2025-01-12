INSERT INTO department (name)
VALUES ('sales'),
       ('engineering'),
       ('finance'),
       ('legal');

INSERT INTO role (title, salary, department)
values ('sales lead', 100000, 1),
		('salesperson', 80000, 1),
		('lead engineer', 150000, 2),
		('software engineer', 120000, 2),
		('account manager', 160000, 3),
		('accountant', 125000, 3),
		('legal team lead', 250000, 4),
		('lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ('John', 'Doe', 1, NULL),
		('Jane', 'Smith', 2, 1),
		('Alice', 'Johnson', 3, NULL),
		('Bob', 'Brown', 4, 3),
		('Charlie', 'Davis', 5, NULL),
		('Eve', 'Wilson', 6, 5);