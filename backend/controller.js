const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("./model/user.js");
const Post = require("./model/post.js");
//const user = require("./backend/model/user.js");

const signup =  async (req, res) => {
   const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password required");
  }

  const existinguser = await User.findOne({ username });

  if(existinguser){
    return res.status(409).send("User already exists with this username");
  }

  const hashedpassword = await bcrypt.hash(password,10);

  await User.create({username , password:hashedpassword});
  res.send("you are stored in my database successfully !!!!!!");
};

const login =  async (req,res) => {
  const {username , password} = req.body;

  if(!username || !password){
     return res.status(400).send("Username and password required");
  }

  const user = await User.findOne({username});
  //const te = user._id;
  //console.log(te);

  if(!user){
    return res.status(404).send("User not found !!!");
  }

  const ismatch = await bcrypt.compare(password , user.password);

  if(!ismatch){
     return res.status(401).send("Invalid password !!");
  }
  // create the token 

  const token = jwt.sign(
    {id:user._id , username : user.username},
    process.env.secret,
    {expiresIn: "1h"}

  );
  res.json({message:"LOGIN DONE" , token: token});

};

const createpost =  async (req,res) => {

  const{content} = req.body;


  await Post.create({
    username : req.user.username,
    content,
    userId:req.user.id,
    time: new Date()

  });

  res.send("POST CREATED !!!!! ");
 
};

const deletepost =  async (req,res) => {
  const postId = req.params.id;
const deletedpost = await Post.findOneAndDelete({
  _id:postId,
  userId:req.user.id
});

console.log(postId);
console.log(deletedpost);

if(!deletedpost){
  return res.status(404).send("post not found !!!! ");
}

res.send("post deleted successfully");

};

const viewpost =  async (req,res) => {
  const posts = await Post.find();
  res.json(posts);
};
const mypost = async(req,res) =>{
  const userspecificpost = await Post.find({
    userId : req.user.id
  });
  res.json(userspecificpost);
};
module.exports = {signup , login , createpost , deletepost , viewpost, mypost };
