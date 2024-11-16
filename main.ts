import {Application, Router} from "@oak/oak"

const router = new Router()

router.get("/", ctx => {
    ctx.response.body = "Hello World!"
})

const app = new Application();
app.use(router.routes())
app.listen({ port: 5000 })