const express = require('express');

require('dotenv').config();
require('./database/database')

const PORT = process.env.PORT || 1678
const departmentRoutes = require('./routes/departmentRoutes')
const courseRoutes = require('./routes/courseRouter')

const app = express()
app.use(express.json())
app.use(departmentRoutes)
app.use(courseRoutes)

app.listen(PORT, ()=> {
    console.log(`Server Is Running On PORT: ${PORT}`);
    
})