import urlSchema from '../models/shorturl.model.js';

export const redirectUrlController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Atomically find and increment click count, get the updated document
    const url = await urlSchema.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } }, // Make sure this matches your schema!
      { new: true }
    );

    if (!url) {
      return res.status(404).send('Short URL not found');
    }

    let redirectUrl = url.full_url;
    if (!/^https?:\/\//i.test(redirectUrl)) {
      redirectUrl = 'https://' + redirectUrl;
    }
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    next(error);
  }
};