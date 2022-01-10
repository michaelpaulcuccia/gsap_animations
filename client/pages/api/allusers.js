import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

export default async (req, res) => {
  await dbConnect();
    
  const data = await User.find({});
  res.status(201).json(data);
   
}

