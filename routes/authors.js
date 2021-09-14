const express = require('express')
const authors = require('../models/authors')
const router = express.Router()
const Author = require('../models/authors')

//all Authou Routes
router.get('/', async (req, res) =>{

    let searchOptions = {}

    if(req.query.name != null && req.query.name != ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const author = await Author.find(searchOptions)
        res.render('authors/index', {allauthor: author,
        searchOptions: req.query})
    }catch{
        res.redirect('/')
    }
})


//New authors
router.get('/New', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

//create new authors
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name

    })
try{
   const newAuthor = await author.save()
   res.redirect(`authors`)

}catch{
    res.render('authors/new', {
        author: author,
        errorMessage: 'Error Creating Author'
    })
}

})

module.exports = router