CREATE TABLE Users(
	email VARCHAR(100) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    last_login TIMESTAMP,
    diagram_Limit INT
);

INSERT INTO Users
VALUES  ("johnsmith@gmail.com", "John", "Smith", "2023-07-01 00:00:01", 10),
		("alexbrown@gmail.com", "Alex", "Brown", "2023-07-02 00:00:01", 10),
        ("georgewilliams@gmail.com", "George", "Williams", "2023-07-03 00:00:01", 10),
        ("nicktaylor@gmail.com", "Nick", "Taylor", "2023-07-04 00:00:01", 10);


CREATE TABLE Diagrams(
	diagram_id INT PRIMARY KEY AUTO_INCREMENT,
    diagram_type VARCHAR(100),
    filepath VARCHAR(100),
    email VARCHAR(100),
    diagram_name VARCHAR(100),
    diagram_creation TIMESTAMP,
    FOREIGN KEY(email) REFERENCES Users(email)
);

INSERT INTO Diagrams (diagram_type, filepath, email, diagram_name, diagram_creation)
VALUES  ("Dependency Wheel", "C:\\Users\\johnsmith\\diagram1", "johnsmith@gmail.com", "a", "2023-07-04 00:00:01"),
		("Basic Column", "C:\\Users\\alexbrown\\diagram2", "alexbrown@gmail.com", "b", "2023-07-04 00:00:01"),
        ("Pie Chart", "C:\\Users\\georgewilliams\\diagram3", "georgewilliams@gmail.com", "c", "2023-07-04 00:00:01");