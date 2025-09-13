const express = require('express');
const path = require('path');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

const dbFile = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS people;`);
  db.run(`CREATE TABLE people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    height INTEGER NOT NULL,
    weight REAL NOT NULL,
    birth_date DATE NOT NULL,
    is_married TEXT NOT NULL CHECK(is_married IN ('Yes','Not Yet'))
  );`);

  const stmt = db.prepare('INSERT INTO people (name,height,weight,birth_date,is_married) VALUES (?,?,?,?,?)');
  stmt.run('Raditya', 185, 59.6, '2001-12-13', 'Not Yet');  
  stmt.run('Fadhlan', 165, 72.1, '2002-12-17', 'Not Yet');  
  stmt.run('Cinut', 171, 67.5, '2001-12-12', 'Yes');     
  stmt.run('Awiw', 180, 75.2, '1999-05-20', 'Yes');         
  stmt.run('Langkong', 160, 60.3, '2000-01-11', 'Not Yet'); 
  stmt.run('Ahmad', 155, 50.4, '1998-08-25', 'Yes');       
  stmt.run('Rina', 162, 54.0, '2001-02-15', 'Not Yet');
  stmt.run('Dedi', 170, 65.8, '1997-07-07', 'Yes');
  stmt.run('Fajar', 174, 69.1, '1996-09-30', 'Not Yet');
  stmt.run('Putri', 168, 58.7, '2003-03-10', 'Yes');
  stmt.run('Joko', 182, 80.2, '1995-12-01', 'Yes');
  stmt.run('Maya', 158, 52.6, '2002-06-18', 'Not Yet');
  stmt.finalize();
  console.log('Database seeded.');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

function buildQuery(filters, operation) {
  const clauses = [];
  const params = [];

  if (filters.name) { clauses.push('name LIKE ?'); params.push(`%${filters.name}%`); }
  if (filters.height) { clauses.push('height = ?'); params.push(parseInt(filters.height,10)); }
  if (filters.weight) { clauses.push('weight = ?'); params.push(parseFloat(filters.weight)); }

  if (filters.birth_date_start && filters.birth_date_end) {
    clauses.push('birth_date BETWEEN ? AND ?');
    params.push(filters.birth_date_start, filters.birth_date_end);
  } else if (filters.birth_date_start) {
    clauses.push('birth_date >= ?');
    params.push(filters.birth_date_start);
  } else if (filters.birth_date_end) {
    clauses.push('birth_date <= ?');
    params.push(filters.birth_date_end);
  }

  if (filters.is_married) { clauses.push('is_married = ?'); params.push(filters.is_married); }

  const joiner = operation === 'OR' ? ' OR ' : ' AND ';
  const whereClause = clauses.length ? ('WHERE ' + clauses.join(joiner)) : '';
  return { whereClause, params };
}

app.get('/', (req,res)=>{
  const page = parseInt(req.query.page||'1');
  const size = 5;
  const filters = {
    name: req.query.name||'',
    height: req.query.height||'',
    weight: req.query.weight||'',
    birth_date_start: req.query.birth_date_start||'',
    birth_date_end: req.query.birth_date_end||'',
    is_married: req.query.is_married||''
  };
  const operation = req.query.operation||'OR';
  const { whereClause, params } = buildQuery(filters, operation);

  db.get(`SELECT COUNT(*) as count FROM people ${whereClause}`, params, (err,row)=>{
    if (err) return res.status(500).send(err.message);
    const total = row.count;
    const totalPages = Math.max(Math.ceil(total/size),1);
    const safePage = Math.min(page,totalPages);
    const offset = (safePage-1)*size;
    db.all(`SELECT * FROM people ${whereClause} LIMIT ? OFFSET ?`, [...params,size,offset], (err,rows)=>{
      if (err) return res.status(500).send(err.message);
      res.render('people/index',{people:rows,page:safePage,totalPages,total,filters,operation});
    });
  });
});

app.get('/new', (req,res)=>{
  res.render('people/form',{person:{},action:'/',title:'Adding Data'});
});

app.post('/', (req,res)=>{
  const {name,height,weight,birth_date,is_married} = req.body;
  db.run(`INSERT INTO people (name,height,weight,birth_date,is_married) VALUES (?,?,?,?,?)`,
    [name,parseInt(height,10),parseFloat(weight),birth_date,is_married], err=>{
      if (err) return res.status(500).send(err.message);
      res.redirect('/');
    });
});

app.post('/delete/:id', (req,res)=>{
  db.run('DELETE FROM people WHERE id=?',[req.params.id], err=>{
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
});

app.get('/edit/:id', (req,res)=>{
  db.get('SELECT * FROM people WHERE id=?',[req.params.id],(err,row)=>{
    if (err) return res.status(500).send(err.message);
    res.render('people/form',{person:row,action:'/edit/'+row.id,title:'Updating Data'});
  });
});

app.post('/edit/:id',(req,res)=>{
  const {name,height,weight,birth_date,is_married} = req.body;
  db.run(`UPDATE people SET name=?,height=?,weight=?,birth_date=?,is_married=? WHERE id=?`,
    [name,parseInt(height,10),parseFloat(weight),birth_date,is_married,req.params.id],err=>{
      if (err) return res.status(500).send(err.message);
      res.redirect('/');
    });
});

app.listen(PORT,()=>console.log('Server running http://localhost:'+PORT));
