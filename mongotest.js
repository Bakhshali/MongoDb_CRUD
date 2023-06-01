import express from "express"
import mongoose, { model, Schema } from "mongoose"

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://Bakshali01:roma9999@cluster0.q0vnezp.mongodb.net/")


const userScheme = new Schema({
    title: String,
    body: String,
    likeCount: Number
})

const userModel = model("post", userScheme)

app.post("/api/posts", async (req, resp) => {
    let post = {
        title: req.body.title,
        body: req.body.body,
        likeCount: req.body.likeCount
    }

    const data = await userModel.create(post)

    resp.send(data)
})

app.get("/api/posts", async (req, resp) => {
    const data = await userModel.find()
    return resp.send(data)
})

app.get("/api/posts/:id", async (req, resp) => {
    let id = req.params.id

    const data = await userModel.findById(id)
    return resp.send(data)
})

app.delete("/api/posts/:id", async (req, resp) => {
    let id = req.params.id
    const data = await userModel.findByIdAndRemove(id)
    return resp.send(data)
})

app.put("/api/posts/:id", async (req, resp) => {
    let id = req.params.id
    const data = await userModel.findByIdAndUpdate(id, {
        title: req.body.title
    })
    return resp.send("Edit data")
})
app.listen(7070)
