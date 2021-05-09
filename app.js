//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Here! I sumit Kumar Gautam introduced my website that will help you to make record of your work and you will also track your daily routine work and can write your work means what you have to do in your future you can write it here and can keep it with you by this you will get to know what work you have to do in your future!!! soo It's your time go to compose page and write your work and keep it remember with yourself....🤩🤩🤩🤩🤩";

const aboutContent = "I sumit kumar Gautam from New Techons has made this website for you means you can blog your task means what you have to do and after that you can make record of it and it is always daved to you because it is saved in database means whenever you will come you will get your data as it is you can add more and more data as per your choice this will help you making track of your daily task.";

const contactContent = "If any doubt is there regarding website or regarding the making of this website you can ping me on my email ID  gautamsumit840@gmail.com.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sumit:sumit123@cluster0.rbg1q.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server has started successfully");
});
