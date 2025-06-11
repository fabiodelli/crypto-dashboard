// src/pages/api/cryptonews.js

export default async function handler(req, res) {
    try {
      const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY}&public=true`;
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      console.error('❌ Errore proxy API:', err);
      res.status(500).json({ error: 'Errore nel recupero delle notizie' });
    }
  }
  