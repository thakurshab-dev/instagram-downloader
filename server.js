require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
console.log("KEY =", process.env.RAPIDAPI_KEY);
app.post('/api/download', async (req,res)=>{
  try{
    const {url} = req.body;

   const response = await fetch(
  `https://instagram-reels-downloader-api.p.rapidapi.com/download?url=${encodeURIComponent(url)}`,
  {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "instagram-reels-downloader-api.p.rapidapi.com"
    }
  }
);
    const data = await response.json();
    console.log("RapidAPI Status:", response.status);
    console.log("RapidAPI Response:", JSON.stringify(data, null, 2));
    res.json(data);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});
app.get('/download-file', async (req, res) => {
  try {
    const fileUrl = req.query.url;

    const response = await fetch(fileUrl);

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="instagram-video.mp4"'
    );

    res.setHeader(
      'Content-Type',
      'video/mp4'
    );

    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
