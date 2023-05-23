// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// pages/api/session.js
export default function handler(req, res) {
  res.json(req.session);
}
