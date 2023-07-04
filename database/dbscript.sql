DROP DATABASE SaaSDB;
CREATE DATABASE SaaSDB;
USE SaaSDB;

CREATE TABLE Users(
	email VARCHAR(100) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    diagram_Limit INT
);

INSERT INTO Users
VALUES  ("johnsmith@gmail.com", "John", "Smith", 5),
		("alexbrown@gmail.com", "Alex", "Brown", 10),
        ("georgewilliams@gmail.com", "George", "Williams", 10),
        ("nicktaylor@gmail.com", "Nick", "Taylor", 4);

SELECT * FROM Users;

CREATE TABLE Diagrams(
	diagram_id INT PRIMARY KEY AUTO_INCREMENT,
    diagram_type VARCHAR(100),
    filepath VARCHAR(100),
    email VARCHAR(100),
    FOREIGN KEY(email) REFERENCES Users(email)
);

INSERT INTO Diagrams (diagram_type, filepath, email)
VALUES  ("Dependency Wheel", "C:\\Users\\johnsmith\\diagram1", "johnsmith@gmail.com"),
		("Basic Column", "C:\\Users\\alexbrown\\diagram2", "alexbrown@gmail.com"),
        ("Pie Chart", "C:\\Users\\georgewilliams\\diagram3", "georgewilliams@gmail.com");

SELECT * FROM Diagrams;
