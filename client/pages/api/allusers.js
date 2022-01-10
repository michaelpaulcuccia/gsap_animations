import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

export default async (req, res) => {
  await dbConnect();
    
  const data = await User.find({});
  res.status(201).json(data);
   
  // if(req.method === 'GET') {
  //   try {
  //     const res = await User.find({});
  //     const users = JSON.stringify(res);
  //     console.log('allusers.js', users)
  //     res.status(201).json({users});
  //   }  catch (error) {
  //     res.status(400).json({ success: 'fuckshit' });
  //   }
  // } else {
  //   console.log('fuckshit')
  // } 
}

