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
  end_date DATETIME
  CHAR(1) NOTNULL
);





--------------
-- Question 2
--------------
-- Create a stored procedure in MySQL

DELIMITER //
CREATE PROCEDURE `GetMessageByCountryAndDateTime`(IN DepatureCountry CHAR(3), IN DepatureDateTime DATETIME)
BEGIN
  SELECT * FROM messages
  WHERE country_code = DepatureCountry
    AND start_date <= DepatureDateTime
    AND end_date >= DepatureDateTime;
END
DELIMITER ;

-- Example call
CALL GetMessageByCountryAndDateTime('NZL', '2023-05-30 12:00:00')


DELIMITER //
CREATE PROCEDURE `GetMessageByCountryAndDateTime`(IN DepatureCountry CHAR(3), IN DepatureDateTime DATETIME)
BEGIN
  SELECT * FROM messages
  WHERE country_code = DepatureCountry
    AND start_date <= DepatureDateTime
    AND end_date >= DepatureDateTime;
END
DELIMITER ;

-- DELIMITER //
-- CREATE PROCEDURE GetMessageByCountryAndDateTime (IN DepatureCountry CHAR(3), IN DepatureDateTime DATETIME)
--   BEGIN
--     DECLARE end_date_val DATETIME
--       SELECT end_date INTO end_date_val FROM messages WHERE country_code = DepatureCountry

--     IF end_date_val IS NULL THEN
--       SELECT * FROM messages
--       WHERE country_code = DepatureCountry
--       AND start_date <= DepatureDateTime
--     ELSE
--       SELECT * FROM messages
--       WHERE country_code = DepatureCountry
--       AND start_date <= DepatureDateTime
--       AND end_date >= DepatureDateTime;
--     END IF;
-- END;
-- DELIMITER ;

-- CREATE PROCEDURE `GetMessageByCountryAndDateTime` (IN DepatureCountry CHAR(3), IN DepatureDateTime DATETIME)
--   BEGIN
--     CASE
--       WHEN end_date IS NULL THEN
--           SELECT * FROM messages
--           WHERE country_code = DepatureCountry
--           AND start_date <= DepatureDateTime;
--       ELSE
--           SELECT * FROM messages
--           WHERE country_code = DepatureCountry
--           AND start_date <= DepatureDateTime
--           AND end_date >= DepatureDateTime;
--     END CASE;
-- END;
-- DELIMITER ;






------------
--Question3 
------------
-- Create test cases for Question 1 in MySQL

-- Test Case1 - check data retrieval
SELECT * FROM message;
SELECT * FROM message WHERE country-code = 'NZL';

-- Test Case2 - test a single row insertion
INSERT INTO messages(admin_title, country_code, text_message, start_date, end_date, type) 
VALUES ('Manager', 'NZL', 'message brah brah brah', '2023-05-24 12:00:00', '2023-06-24 12:00:00')

-- Test Case3 - check invalid country code
-- False
INSERT INTO messages(admin_title, country_code, text_message, start_date, end_date, type) 
VALUES ('Manager', 'AB', 'message brah brah brah', '2023-05-24 12:00:00', '2023-06-24 12:00:00')

-- Test Case4 - Update country code in a single row
UPDATE messages SET country_code = 'AUS' WHERE id = 1;

-- Test Case5 - Delete a single row
DELETE FROM messages
WHERE id = 1;


-- Create test cases for Question 2 in MySQL

-- Test Case
CREATE PROCEDURE GetEmployeeCount(IN departmentId INT, OUT employeeCount INT)
BEGIN
  IF departmentId IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Department ID cannot be null';
  END IF;

  SELECT COUNT(*) INTO employeeCount FROM Employees WHERE department_id = departmentId;
END;

-- ??

DELIMITER //
CREATE TRIGGER assertion_trigger
BEFORE INSERT ON messages
FOR EACH ROW
BEGIN
  IF NEW.start_date >= 


END;

