import urlSchema from "../models/shorturl.model.js";
export const saveShortUrl = async(url, shortUrl , userId) =>{
    try {
      const newUrl = new urlSchema({
      full_url: url,
      short_url: shortUrl,
      clicks: 0,
    });
    if(userId) {
        newUrl.user = userId;
    }
    await newUrl.save();
    } catch (error) {
        throw new Error("Error saving short URL: " + error.message);
    }
    
    
}

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url:slug});
}