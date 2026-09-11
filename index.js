import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
const port = 3000;
const posts = [];
app.get('/', (req, res) => {
  res.render('index.ejs', { posts });

});

app.get('/create', (req, res) => {

res.render('create.ejs');

});
app.post('/create', (req, res) => {
  const { title,introduction, content } = req.body;
  
  if (!title || !introduction || !content) {
    return res.send("All fields are required");
}
  posts.push({ id:posts.length+1, title, introduction, content });
 
  res.redirect('/');

});
app.get('/edit/:id', (req, res) => {
    
    const post = posts.find(post => post.id == req.params.id);
    if (!post) {
        return res.send("Post not found");
    }
    res.render('edit', { post });
});
app.post('/edit/:id', (req, res) => {
  const { title, introduction, content } = req.body;
  const postIndex = posts.findIndex(post => post.id == req.params.id);          
  if (postIndex === -1) {
    return res.send("Post not found");
}

 posts[postIndex] = {
  ...posts[postIndex],
  title,
  introduction,
  content
};
  res.redirect('/');

});
app.post('/delete/:id', (req, res) => {
  const postIndex = posts.findIndex(post => post.id == req.params.id);
  if (postIndex === -1) {
    return res.send("Post not found");
  } posts.splice(postIndex, 1);
  res.redirect('/');
});
app.get('/post/:id', (req, res) => {
    const post = posts.find(post => post.id == req.params.id);

    if (!post) {
        return res.send("Post not found");
    }

    res.render('post', { post });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});