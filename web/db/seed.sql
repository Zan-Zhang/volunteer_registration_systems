
INSERT INTO Genders (genderName)
VALUES ("male"),
       ("female"),
       ("trans");

INSERT INTO StudentID (studentID)
VALUES (100),
       (101),
       (102);

INSERT INTO Languages (languageName)
VALUES ("Chinese"),
       ("English"),
       ("A");

INSERT INTO Grades (levelName)
VALUES ("frashman"),
       ("sophomore"),
       ("junior"),
       ("senior");

INSERT INTO Students (fname, lname, studentGenders, studentGrades)
VALUES
       ("Bob", "Young", 3, 1),
       ("A", "Young", 1, 3),
       ("B", "Young", 2, 2);

INSERT INTO skill_table (personID, languageID)
VALUES
       (1, 1),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 3),
       (3, 2);

--select * from skill_table left join Languages on (skill_table.languageID = Languages.languageID)
--select * from Students left join Grades on (Grades.gradesID = Students.studentGrades) left join Genders on (Genders.genderID = Students.studentGenders) left join StudentID on (Students.personID = StudentID.personID
--select * from skill_table left join Languages on (skill_table.languageID = Languages.languageID)
--update Students set fname="${fname}", lname="${lname}", studentGenders="${genderName}", studentGrades="${levelName}" where personID = ${personID}
--delete from Students where personID = "${personID}
--delete from skill_table where personID = "${personID}"
--select * from Genders
--delete from Genders where genderID = "${genderID}"
--insert into Genders (genderName) VALUES ("${genderName}")
--insert into skill_table (personID, languageID) VALUES ${values.map(lang => `(${personID}, ${lang})`).join(" , ")}
--insert into Genders (genderName) VALUES ("${genderName}")
--update Genders set genderName = "${genderName}" where genderID = "${genderID}"
--select * from Languages
--insert into Languages (languageName) VALUES ("${languageName}")
--delete from Languages where languageID = "${languageID}
--update Languages set languageName = "${languageName}" where languageID = "${languageID}"
--select * from Grades
--insert into Grades (levelName) VALUES ("${levelName}")
--delete from Grades where gradesID = "${gradesID}"
--update Grades set levelName = "${levelName}" where gradesID = "${gradesID}"

