const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/sqlite.db', (err) => {
    if (err) {
        console.error({err});
    }

    console.log('Connected')
})

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS profiles (id integer primary key, name string NOT NULL)')
        .run('CREATE TABLE IF NOT EXISTS tasks (id integer primary key, title string NOT NULL, description string)')
    // .run(`INSERT INTO profiles(name) VALUES('Profile_1'), ('Profile_2')`)
    // .each('SELECT name FROM profiles', (err, each) => {
    //     console.log(each);
    // });
});

db.close();