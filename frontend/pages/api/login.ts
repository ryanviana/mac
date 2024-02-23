import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { type } = req.body;

    if (type === "creator" || type === "advertiser") {
      const token = Buffer.from(JSON.stringify({ type })).toString("base64");
      res.status(200).json({ token });
    } else {
      res.status(400).json({ error: "Invalid user type" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
