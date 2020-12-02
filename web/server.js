var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var pool = mysql.createPool({
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_****',
	password: '*********',
	database: '******'
});



var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/modify', function(req, res) {
	res.render('modify');
});
app.get('/search', function(req, res) {
	res.render('search');
});
app.get('/addstudent', function(req, res) {
	res.render('addstudent');
});
app.get('/addgender', function(req, res) {
	res.render('addgender');
});
app.get('/addlang', function(req, res) {
	res.render('addlang');
});
app.get('/addgrade', function(req, res) {
	res.render('addgrade');
});



app.post('/query', (req, res) => {
  console.log(req.body)
  pool.query(req.body.sql, (err, rows, fields) => {
    res.send({
      data: rows
    })
  })
});

app.post('/insert', (req, res) => {
  console.log(req.body)
  pool.query(req.body.sql, (err, rows, fields) => {
    res.send({
      data: rows
    })
  })
});




app.post('/search', (req, res) => {
	pool.query(req.body.sql, (err, rows, fields) => {
		const data = rows
		pool.query(`select * from skill_table left join Languages on (skill_table.languageID = Languages.languageID)`,
			(err, langs, fiedls) => {
				res.send({
					data,
					langs
				})
			}
		)
	})
})

app.post('/query/student', (req, res) => {
	pool.query('select * from Students left join Grades on (Grades.gradesID = Students.studentGrades) left join Genders on (Genders.genderID = Students.studentGenders) left join StudentID on (Students.personID = StudentID.personID)',
		(err, rows, fields) => {
			res.send({
				data: rows
			})
		}
	)
})

app.post('/query/skill_table', (req, res) => {
	pool.query('select * from skill_table left join Languages on (skill_table.languageID = Languages.languageID)',
		(err, rows, fields) => {
			res.send({
				data: rows
			})
		}
	)
})


app.post('/update/student', (req, res) => {
	const {
		fname, lname, genderName, levelName, personID
	} = req.body
	pool.query(`update Students set fname="${fname}", lname="${lname}", studentGenders="${genderName}", studentGrades="${levelName}" where personID = ${personID}`,
		(err, rows, fields) => {
			res.send({
				data: rows
			})
		}
	)
})

app.post('/delete/student', (req, res) => {
	const {
		personID
	} = req.body
	pool.query(`delete from Students where personID = "${personID}"`, () => {
		res.send({})
	})
})

app.post('/delete/skill_table', (req, res) => {
	const {
		personID
	} = req.body
	pool.query(`delete from skill_table where personID = "${personID}"`, (err, rows, fields) => {
		res.send(rows)
	})
})

app.post('/insert/skill_table', (req, res) => {
	const {
		values,
		personID
	} = req.body
	pool.query(`insert into skill_table (personID, languageID) VALUES ${values.map(lang => `(${personID}, ${lang})`).join(" , ")}`, (err, rows, fields) => {
		res.send(rows)
	})
})

app.post('/query/genders', (req, res) => {
	pool.query('select * from Genders', (err, rows, fields) => {
		res.send({
			data: rows
		})
	})
})

app.post('/delete/genders', (req, res) => {
	const {
		genderID
	} = req.body
	pool.query(`delete from Genders where genderID = "${genderID}"`, (err, rows, fields) => {
		res.send({})
	})
})


app.post('/insert/genders', (req, res) => {
	const {
		genderName
	} = req.body
	pool.query(`insert into Genders (genderName) VALUES ("${genderName}")`, (err, rows, fields) => {
		res.send({})
	})
})

app.post('/update/genders', (req, res) => {
	const {
		genderID,
		genderName
	} = req.body
	pool.query(`update Genders set genderName = "${genderName}" where genderID = "${genderID}"`, (err, rows, fields) => {
		res.send({})
	})
})



app.post('/query/lang', (req, res) => {
	pool.query('select * from Languages', (err, rows, fields) => {
		res.send({
			data: rows
		})
	})
})

app.post('/insert/lang', (req, res) => {
	const {
		languageName
	} = req.body
	pool.query(`insert into Languages (languageName) VALUES ("${languageName}")`, (err, rows, fields) => {
		res.send({
			data: rows
		})
	})
})

app.post('/delete/lang', (req, res) => {
	const {
		languageID
	} = req.body
	pool.query(`delete from Languages where languageID = "${languageID}"`, (err, rows, fields) => {
		res.send({})
	})
})

app.post('/update/lang', (req, res) => {
	const {
		languageID,
		languageName
	} = req.body
	pool.query(`update Languages set languageName = "${languageName}" where languageID = "${languageID}"`, (err, rows, fields) => {
		res.send({})
	})
})













app.post('/query/grades', (req, res) => {
	pool.query('select * from Grades', (err, rows, fields) => {
		res.send({
			data: rows
		})
	})
})

app.post('/insert/grades', (req, res) => {
	const {
		levelName
	} = req.body
	pool.query(`insert into Grades (levelName) VALUES ("${levelName}")`, (err, rows, fields) => {
		res.send({
			data: rows
		})
	})
})

app.post('/delete/grades', (req, res) => {
	const {
		gradesID
	} = req.body
	pool.query(`delete from Grades where gradesID = "${gradesID}"`, (err, rows, fields) => {
		res.send({})
	})
})

app.post('/update/grades', (req, res) => {
	const {
		gradesID,
		levelName
	} = req.body
	pool.query(`update Grades set levelName = "${levelName}" where gradesID = "${gradesID}"`, (err, rows, fields) => {
		res.send({})
	})
})



app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Application started on port ' + app.get('port'));
});

