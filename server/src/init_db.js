const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/sqlite.db', (err) => {
    if (err) {
        console.error({err});
    }

    console.log('Connected')
})

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS profiles (' +
        'id integer primary key, ' +
        'name string NOT NULL)')
        .run('CREATE TABLE IF NOT EXISTS tasks (' +
            'id integer primary key, ' +
            'userId integer NOT NULL, ' +
            'title string NOT NULL, ' +
            'status string NOT NULL, ' +
            'task_date datetime NOT NULL, ' +
            'description string)')
        // .run(`INSERT INTO profiles(name) VALUES('Profile_1'), ('Profile_2')`)
        .each('SELECT * FROM tasks', (err, each) => {
            console.log(each);
        });
});

db.close();
