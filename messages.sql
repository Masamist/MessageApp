--------------
-- Question 1
--------------
-- Create a new table in MySQL
CREATE TABLE messages (
  id INT PRIMARY KEY AUTOINCREMENT,
  admin_title VARCHAR(50) NOTNULL,
  country_code CHAR(3) NOTNULL,
  text_message TEXT NOTNULL,
  start_date DATETIME NOTNULL,
  end_date DATETIME,
  message_type CHAR(1) NOTNULL
);





--------------
-- Question 2
--------------
-- Create a stored procedure in MySQL

DELIMITER //
CREATE PROCEDURE `GetMessageByCountryTest`(IN DepatureCountry CHAR(3), IN DepatureDateTime DATETIME)
BEGIN
  SELECT * 
  FROM messages
  WHERE country_code = DepatureCountry
	AND start_date <= DepatureDateTime
    AND end_date >= DepatureDateTime
    AND message_type = 'B'
  UNION
  SELECT * 
  FROM messages
  WHERE country_code = DepatureCountry
	AND start_date<= DepatureDateTime
    AND message_type = 'A'
  UNION
  SELECT * 
  FROM messages
  WHERE country_code = 'AAA'
	AND start_date<= DepatureDateTime
  ORDER BY country_code DESC, message_type DESC, start_date DESC
  LIMIT 1;
END
DELIMITER ;

-- Example call
CALL GetMessageByCountryAndDateTime('NZL', '2023-05-30 12:00:00')






------------
--Question3 
------------
-- Create test cases for Question 1 in MySQL
-- dummy data

INSERT INTO messages(admin_title, country_code, text_message, start_date, end_date, type) 
VALUES ('Manager', 'NZL', 'Kia Ora', '2023-06-24 12:00:00', NULL, 'A')
VALUES ('Admin Test', 'AAA', 'Hello', '2023-04-22 12:00:00', NULL, 'A')
VALUES ('Admin', 'NZL', 'Happy Holiday', '2023-12-24 12:00:00', '2023-01-10 12:00:00', 'B')
VALUES ('Office Administrator', 'AUS', 'Gidday', '2023-05-24 12:00:00', NULL , 'A')


-- Test Case1 - check data retrieval
-- Return 2 rows
SELECT * FROM message WHERE country-code = 'NZL';

-- Test Case2 - test a single row insertion
-- Insert one row
INSERT INTO messages(admin_title, country_code, text_message, start_date, end_date, type) 
VALUES ('Office Administrator', 'NZL', 'Happy New Year', '2024-01-01 12:00:00', '2024-01-05 12:00:00', 'B')

-- Test Case3 - check invalid country code
-- Return error
INSERT INTO messages(admin_title, country_code, text_message, start_date, end_date, type) 
VALUES ('Manager', 'AB', 'message brah brah brah', '2023-05-24 12:00:00', '2023-06-24 12:00:00', 'A')

-- Test Case4 - Update country code in a single row
-- return (3, 'Admin', 'AUS', 'Happy Holiday', '2023-12-24 12:00:00', '2023-01-10 12:00:00', 'B')
UPDATE messages SET country_code = 'AUS' WHERE id = 3;

-- Test Case5 - Delete a single row
-- Delete id=2 row 
DELETE FROM messages WHERE id = 2;


-- Create test cases for Question 2 in MySQL
-- Test Case 5
-- return ('Manager', 'NZL', 'Kia Ora', '2023-06-24 12:00:00', NULL, 'A')
CALL GetMessageByCountryAndDateTime('NZL', '2023-06-25 12:00:00')



