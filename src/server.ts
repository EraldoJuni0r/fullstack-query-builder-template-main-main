import express, { Request, Response } from "express"
import { knex } from "./database/knex"

const app = express()
app.use(express.json())

app.get("/", async (request: Request, response: Response) => {
  const { name } = request.body

  await knex("courses").insert({ name })


  response.status(201).json()
})

app.get("./courses", async (request: Request, response: Response) => {
  const courses = await knex("courses").select().orderBy("name", "asc")
  response.json(courses)
})

app.get("./courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params
  const { name } = request.body

  await knex("courses").update({ name }).where({ id })

  return response.json()
})

app.delete("./courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params

  await knex("courses").delete().where({ id })
  return response.json()
})

app.post("/modules", async (request: Request, response: Response) => {
  const modules = await knex("course_modules").select("id, name")

  return response.json(modules)
})

app.get("/courses/:id/modules", async (request: Request, response: Response) => {
  const courses =await knex("courses")
  .select(
    "courses.id As course_id",
    "course_modules.id As course_module_id", 
    "course_modules.name As module", 
    "courses.name As course"
  )
  .join("course_modules", "courses.id", "course_modules.course_id")
  return response.json(courses)
})



app.listen(3333, () => console.log(`Server is running on port 3333`))