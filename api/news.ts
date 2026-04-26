export default async function handler(req: any, res: any) {
  const category = req.query.category || 'all';
  const NEWS_API_KEY = process.env.VITE_NEWS_API_KEY;

  if (!NEWS_API_KEY) {
    return res.status(500).json({ error: 'News API key not configured' });
  }

  let query = '';
  switch (category) {
    case 'culture':
      query = encodeURIComponent('(india AND (culture OR festival OR tradition OR art OR music OR dance OR language))');
      break;
    case 'heritage':
      query = encodeURIComponent('(india AND (heritage OR monument OR temple OR "historical site" OR architecture OR history OR ancient))');
      break;
    case 'tourism':
      query = encodeURIComponent('(india AND (tourism OR "tourist destination" OR travel OR vacation OR visit OR attraction))');
      break;
    default:
      query = encodeURIComponent('(india AND (culture OR heritage OR tourism OR temple OR monument OR festival OR tradition OR "historical site" OR "tourist destination"))');
  }

  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
}
