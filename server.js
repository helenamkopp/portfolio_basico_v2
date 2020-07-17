const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true

})

server.get("/", function(req, res) {

    const about = {
        avatar_url: "https://images.unsplash.com/photo-1592439203425-76eb2fae81fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        name: "Professor fulano de tal",
        role: "Facilitando as linguagens de programação",
        description: "Focado em JavaScript e suas tecnologias como Node e React",
        links: [
            {name: "Github", url: "https://github.com/helenamkopp"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/helena-meyer-kopp/"},
            {name: "Twitter", url: "https://twitter.com/helenaameyer"}
        ]
    }
    return res.render("about", { about: about })

})

server.get("/portfolio", function(req, res) {

    return res.render("portfolio", { items: videos })

})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
       return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }
    
    return res.render("video", { item: video })

})

server.listen(5000, function() {
    console.log("server is ruunning")
})