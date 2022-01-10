import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

export default async (req, res) => {
  await dbConnect();
  if(req.method === 'POST') {
    try {
      const user = await User.create(req.body); 
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({message: `Method ${req.method} not permitted`})
  }
}

