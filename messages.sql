
Hi, Thank you for assessing my answers. 
I have completed the 4 questions. Talking about Q1,
I have not used SQL before so I used MySQL which has no assertions built in, 
so I have used store procedure to cover this.  

I could have done the Q4 with APS.NET, 
I have used React, Node, Express and MySQL instead. 
The app is simple CRUD application so an admin can manage the messages, 
but it does not have the functionality to sort a single message from the conditions yet.  

The application was fun to create, I would really love to imagine 
the application from the users perspective and to create a better overall solution. 

I did not allow enough time for testing. 
It was a great opportunity to work through these questions, 
it gives me good motivation to keep expanding my skills. 



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
CREATE PROCEDURE `GetMessageByCountryDate`(IN DepatureCountry CHAR(3), IN DepatureDateTime DATETIME)
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
INSERT INTO messages(admin_title, country_code, text_message, start_date, end_date, message_type) 
VALUES ('Manager', 'NZL', 'Kia Ora', '2023-06-24 12:00:00', NULL, 'A'),
  ('Admin Test', 'AAA', 'Hello', '2023-04-22 12:00:00', NULL, 'A'),
  ('Office Administrator', 'AUS', 'Gidday', '2023-05-24 12:00:00', NULL , 'A'),
  ('Admin Test', 'ANZ', 'Happy Mothers Day', '2023-05-05 12:00:00', '2023-05-15 12:00:00', 'B'),
  ('Office Administrator', 'NZL', 'Happy Holiday', '2023-12-24 12:00:00', '2023-01-10 12:00:00', 'B'),
  ('Office Administrator', 'AUS', 'Happy Holiday', '2023-12-24 12:00:00', '2023-01-05 12:00:00', 'B'),
  ('Admin Test', 'AAA', 'Hi, There', '2023-06-01 12:00:00', NULL, 'A');


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
-- return (3, 'Admin', 'AUS', 'Happy Holiday', '2023-12-25 12:00:00', NULL, 'B')
UPDATE messages SET start_date = '2023-05-25 12:00:00' WHERE id = 3;

-- Test Case5 - Delete a single row
-- Delete id=2 row 
DELETE FROM messages WHERE id = 2;


-- Create test cases for Question 2 in MySQL
-- Test Case

DELIMITER //

CREATE PROCEDURE `test_GetMessageByCountryDate_return_single_message`()

  BEGIN
    DECLARE assertion_failed INT DEFAULT 0

    -- Call the stored procedure
    CALL GetMessageByCountryDate('NZL', '2023-06-25 12:00:00')

    -- Assertion 1: Check if the update was successful
    IF ROW_COUNT() = 0 THEN
      -- Handle assertion failure
      SET assertion_failed = 1
      SELECT 'Assertion check_procedure_GetMessageByCountryTest failed: No message is returned '
    END IF

    -- Assertion 2: Check if the update was successful
    IF ROW_COUNT() > 1  THEN
      SET assertion_failed = 1
      -- Handle assertion failure
      SELECT 'Assertion check_procedure_GetMessageByCountryTest failed: multiple messages are returned '
    END IF;
    
    -- Successful assertion
    SELECT 'Single message is returned';
  END

DELIMITER ;

