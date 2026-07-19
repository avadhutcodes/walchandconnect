const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

const User = require("./model/user.js");
const Post = require("./model/post.js");

//const user = require("./backend/model/user.js");

const signup =  async (req, res) => {
   const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({message:"Username and password required"});
  }

  const existinguser = await User.findOne({ username });

  if(existinguser){
    return res.status(409).json({message:"User already exists with this username"});
  }

  const hashedpassword = await bcrypt.hash(password,10);

  await User.create({username , password:hashedpassword});
  res.json({message:"you are stored in my database successfully !!!!!!"});
};

const login =  async (req,res) => {
   
  const {username , password} = req.body;

  if(!username || !password){
    
     return res.status(400).json({message:"Username and password required"});
  }

  const user = await User.findOne({username});
  //const te = user._id;
  //console.log(te);

  if(!user){
    return res.status(404).json({message:"User not found !!!"});
  }

  const ismatch = await bcrypt.compare(password , user.password);

  if(!ismatch){
     return res.status(401).json({message:"Invalid password !!"});
  }
  // create the token 

  const token = jwt.sign(
    {id:user._id , username : user.username},
    process.env.secret,
    {expiresIn: "60h"}

  );

res.cookie("token" , token ,{
  httpOnly:true,
  secure:false,
  sameSite:"lax",
  maxAge:216000000,
});

   res.status(200).json({ message:"cookie sent done"});

};

const createpost =  async (req,res) => {
  

  const{ title, content} = req.body;


  await Post.create({
    username : req.user.username,
    title,
    content,
    userId:req.user.id,
    likes:[""],
    time: new Date()
  });

  res.json({message:"POST CREATED !!!!! "});
 
};

const deletepost =  async (req,res) => {
  console.log("delete post was fired")
  const postId = req.params.id;
const deletedpost = await Post.findOneAndDelete({
  _id:postId,
  userId:req.user.id
});

console.log(postId);
console.log(deletedpost);

if(!deletedpost){
  return res.status(404).json({message:"post not found !!!! "});
}

res.json({message:"post deleted successfully"});

};

const viewpost =  async (req,res) => {
  const posts = await Post.find().sort({time:-1});
  res.json({posts});
};

const mypost = async(req,res) =>{
  const mypost = await Post.find({
    userId : req.user.id
  }).sort({time:-1});


  res.json({mypost});
};

const viewSingle = async(req,res) => {
  const blog = await Post.findById(req.params.id);
  res.json({blog});
}

const likesystem = async(req,res) => {
  const {username} = req.user.username;
  const post = await Post.findById(req.params.id);
   const index = post.likes.indexOf(username);

    if (index === -1) {
      post.likes.push(username); // like
    } else {
      post.likes.splice(index, 1); // unlike
    }
    await post.save();

     res.json({ likesCount: post.likes.length, liked: index === -1 });
   
}
module.exports = {signup , login , createpost , deletepost , viewpost, mypost , viewSingle,likesystem};
