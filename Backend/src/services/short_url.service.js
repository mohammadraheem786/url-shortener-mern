import { generateNanoid } from "../utils/helper.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short.url.dao.js"

export const createShortUrlWithoutUser = async (url) => {
    
    const shortUrl = generateNanoid(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(url,shortUrl);
    return shortUrl
}

export const createShortUrlWithUser = async (url,userId,slug) => {
    const shortUrl = slug || generateNanoid(7)
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This custom url already exists")

    await saveShortUrl(url,shortUrl,userId)
    return shortUrl
}