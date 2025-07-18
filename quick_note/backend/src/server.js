import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

// Allows the ability to use the .env variables
dotenv.config()

// Creating a new express app
const app = express()

// Variable to store PORT (uses .env stored PORT or defaults to 5001)
const PORT = process.env.PORT || 5001


//middleware
// Allows requests from different domains to be passed to the server
app.use(cors())
// Makes the express app use JSON
app.use(express.json()) 
// Makes the express app use the rate limiter that is set up
app.use(rateLimiter)

// Routing
// App uses the notesRoutes router for requests to http://localhost:5001/api/notes
app.use("/api/notes", notesRoutes)

// Handle the connection to the db and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})

