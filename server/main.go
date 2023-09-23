package main

import "github.com/gofiber/fiber/v2"

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {
	app := fiber.New()

	todos := []Todo{}

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})

	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return c.Status(400).SendString(err.Error())
		}

		/* Assign default values to new Todo */
		todo.ID = len(todos) + 1
		todo.Done = false

		todos = append(todos, *todo)

		return c.JSON(todo)
	})

	app.Patch("/api/todos/:id/done", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id");

		if err != nil {
			return c.Status(401).SendString(err.Error())
		}

		for i, todo := range todos {
			if(todo.ID == id) {
				todos[i].Done = true
				return c.JSON(todos[i])
			}
		}
		// If no todo is found, return 404 and message
		return c.Status(404).SendString("Todo not found")
	})

	app.Listen(":3000")
}
