const mongoose = require('mongoose')
const URI = process.env.MONGODB_URI
console.log(URI);

mongoose.connect(URI)
.then(()=>{
    console.log('Connection To Database Established Successfully');
})
.catch((error)=> {
    console.log('Connection To Database Failed ', error.message);
})