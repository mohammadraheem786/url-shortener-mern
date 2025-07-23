import { getShortUrl } from "../dao/short.url.dao.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/wrapAsync.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug)
    }else{  
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,slug)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})  