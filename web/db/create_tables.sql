/*
 * Drop statements to clean the out the old star_trek database records
 * if they exist.
*/

DROP TABLE IF EXISTS `skill_table`;
DROP TABLE IF EXISTS `Languages`;
DROP TABLE IF EXISTS `Students`;
DROP TABLE IF EXISTS `StudentID`;
DROP TABLE IF EXISTS `Grades`;
DROP TABLE IF EXISTS `Genders`;



CREATE TABLE `Grades` (
   `gradesID` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `levelName` VARCHAR(255) NOT NULL
);

CREATE TABLE `Languages` (
   `languageID` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `languageName` VARCHAR(255) NOT NULL
);


CREATE TABLE `StudentID` (
   `personID` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `studentID` INT(11)
);

CREATE TABLE `Genders` (
   `genderID` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `genderName` VARCHAR(255) NOT NULL
);


CREATE TABLE `Students` (
   `personID` INT(11) PRIMARY KEY AUTO_INCREMENT,
   `fname` VARCHAR(255) NOT NULL,
   `lname` VARCHAR(255),
   `studentGenders` Int(11),
   FOREIGN KEY(`studentGenders`) REFERENCES Genders(`genderID`)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
   `studentGrades` Int(11),
   FOREIGN KEY(`studentGrades`) REFERENCES Grades(`gradesID`)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE `skill_table` (
   `personID` INT(11),
   FOREIGN KEY(`personID`) REFERENCES Students(`personID`)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
   `languageID` INT(11),
   FOREIGN KEY(`languageID`) REFERENCES Languages(`languageID`)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

