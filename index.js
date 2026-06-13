
const express = require('express');
const app = express();
const PORT = 3000;

let authors = [

 {

   id: 1,

   name: 'Ana García',

   email: 'ana@example.com',

   bio: 'Desarrolladora full-stack apasionada por Node.js'

 },

 {

   id: 2,

   name: 'Carlos Ruiz',

   email: 'carlos@example.com',

   bio: 'Escritor técnico especializado en bases de datos'

 },

 {

   id: 3,

   name: 'María López',

   email: 'maria@example.com',

   bio: 'Ingeniera de software con foco en APIs REST'

 }

];

let nextIdAuthors = 4;

let posts = [

 {

   id: 1,

   title: 'Introducción a Node.js',

   content: 'Node.js es un runtime de JavaScript...',

   author_id: 1,

   published: true

 },

 {

   id: 2,

   title: 'PostgreSQL vs MySQL',

   content: 'Ambas bases de datos tienen ventajas...',

   author_id: 2,

   published: true

 },

 {

   id: 3,

   title: 'APIs RESTful',

   content: 'REST es un estilo arquitectónico...',

   author_id: 1,

   published: true

 },

 {

   id: 4,

   title: 'Manejo de errores en Express',

   content: 'El manejo apropiado de errores...',

   author_id: 3,

   published: false

 },

 {

   id: 5,

   title: 'Async/Await explicado',

   content: 'Las promesas simplifican el código asíncrono...',

   author_id: 1,

   published: false

 }

];

let nextIdPosts = 6;

app.use(express.json())

app.get('/authors', (req, res) => {

    res.json(authors);

})

app.post('/authors', (req, res) => {

    const { name, email, bio } = req.body;

    if (!name || !email || !bio) {

        return res.status(400).json( { error: "Todos los campos son obligatorios"});
    }

    let newAuthor = { 

        id: nextIdAuthors++,
        name,
        email,
        bio,

    };

   authors.push(newAuthor)
   res.status(201).json(newAuthor)
} )

app.get('/authors/:id',(req,res)=>{
    const id = Number(req.params.id);

    const author = authors.find(au => au.id === id);

    if(!author) {
        return res.status(404).json({ error: "Author not found"})
    }

    res.status(200).json(author);

})

app.put('/authors/:id', (req,res) => {
  
  const id = Number(req.params.id);

  if(Number.isNaN(id)){
    return res.status(400).json( { error: "invalid id" } );
  }

  const index = authors.findIndex(au => au.id === id);

  if(index === -1 ){
    return res.status(404).json( { error: "author not found" } );
  }

  const { name, email, bio } = req.body;

  if(!name || !email ){
    return res.status(400).json({ error: "Name and email are obligatory fields"});
  }

  authors[index] = { ...authors[index], name, email, bio};

  const author = authors[index];

  return res.status(200).json(author);
});




app.delete('/authors/:id',(req,res)=>{

    const id = Number(req.params.id);

    if(Number.isNaN(id)){
      return res.status(400).json( { error: "invalid id"})
    }

    const index = authors.findIndex(au => au.id === id);

    if(index === -1){
        return res.status(404).json({ error: "Autor no encontrado" });
    }

    const authorDeleted = authors.splice(index,1)[0];

    res.status(200).json(authorDeleted);
})

app.get('/posts', (req, res) => {

    res.json(posts);     
});

app.get('/posts/:id',(req,res)=>{
    const id = Number(req.params.id);

    const post = posts.find(p => p.id === id);

    if(!post) {
        return res.status(404).json({ error: "Post not found"})
    }

    res.status(200).json(post);
})

app.get('/posts/author/:authorId', (req,res) => {

  const authorid = parseInt(req.params.authorId);
  
  if(isNaN(authorid)){
    return res.status(400).json({ error: "invalid id"});
  }

  const author = authors.find(au => au.id == authorid);

  if(!author){
    return res.status(404).json({ error: "Author not found" } );
  }

  const postOfAuthor = posts.filter(p => p.author_id === authorid);

  res.status(200).json({
    author,
    posts: postOfAuthor,
  });



});

app.post('/posts', (req,res) => {
  const { title, content, author_id, published = false } = req.body;

  if(!title || !content || !author_id){
    return res.status(400).json( { error: "title, content and author_id are obligatory fields"} );
  }

  const author = authors.find(au => au.id === author_id);

  if(!author){
    return res.status(404).json( { error: "Author not found" } );
  }

  const newPost = {
    id: nextIdPosts++,
    title,
    content,
    author_id,
    published,
    created_at: new Date()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req,res) => {
  const id = Number(req.params.id);

  const index = posts.findIndex(p => p.id === id);

  if(index === -1 ){
    return res.status(404).json( { error: "post not found" } );
  }

  const { title, content, published } = req.body;

  if(!title || !content ){
    return res.status(400).json({ error: "Title and content are obligatory fields"});
  }

  posts[index] = { ...posts[index], title, content, published};

  const post = posts[index];

  return res.status(200).json(post);
});

app.delete('/posts/:id', (req,res) => {
   const id = Number(req.params.id);

    if(Number.isNaN(id)){
      return res.status(400).json( { error: "invalid id"})
    }

    const index = posts.findIndex(p => p.id === id);

    if(index === -1){
        return res.status(404).json({ error: "Post no encontrado" });
    }

    const postDeleted = posts.splice(index,1)[0];

    res.status(200).json(postDeleted);
})




app.listen(PORT, () => {
  console.log("Server on http://localhost:3000");
});