// seedUser.js (file tạm để demo tạo user)

const bcrypt = require('bcrypt');
const db = require('../config/config');

async function seedUser() {
    const email = 'demo@gmail.com';
    const password = '123456';
    const hash = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
        } else {
            console.log('User inserted successfully!');
        }
        process.exit();
    });
}
                    
seedUser();
