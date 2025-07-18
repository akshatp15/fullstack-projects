import ratelimit from "../config/upstash.js"

// Rate limter setip
const rateLimiter = async (req, res, next) => {
    try{
        // Check if user is rate limited
        const {success} = await ratelimit.limit("my-rate-limit")

        // If there is no connection then user is rate limited
        if(!success){
            return res.status(429).json({message:"Too many request, please try again later"})
        }
        // Move on to next function 
        next()

    } 
    catch(error){
        // Error handling
        console.log("Rate limit error", error)
        next(error)
    }
}

export default rateLimiter