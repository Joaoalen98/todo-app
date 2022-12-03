using System;
using System.Threading.Tasks;
using MeuTodo.Data;
using MeuTodo.Models;
using MeuTodo.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MeuTodo.Controllers
{
    [ApiController]
    [Route("v1")]
    public class TodoController : Controller
    {
        [HttpGet]
        [Route("todos")]
        public async Task<IActionResult> GetAsync([FromServices] AppDbContext db)
        {
            var todos = await db.Todos
                .AsNoTracking()
                .ToListAsync();

            return Ok(todos);
        }

        [HttpGet]
        [Route("todos/{id}")]
        public async Task<IActionResult> GetByIdAsync(
            [FromServices] AppDbContext db, [FromRoute] int id)
        {
            var todo = await db.Todos
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            return todo == null
                ? NotFound()
                : Ok(todo);
        }


        [HttpPost]
        [Route("todos")]
        public async Task<IActionResult> PostAsync(
            [FromServices] AppDbContext db,
            [FromBody] CreateTodoViewModel model
        )
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var todo = new Todo
            {
                Title = model.Title,
                Date = DateTime.Now,
                Done = false,
            };

            try
            {
                await db.Todos.AddAsync(todo);
                await db.SaveChangesAsync();
                return Created($"v1/todos/{todo.Id}", todo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("todos/{id}")]
        public async Task<IActionResult> PutAsync(
            [FromServices] AppDbContext db,
            [FromBody] EditTodoViewModel model,
            [FromRoute] int id
        )
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var todo = await db.Todos.FirstOrDefaultAsync(x => x.Id == id);

            if (todo == null)
                return NotFound();

            try
            {
                todo.Title = model.Title;
                todo.Done = model.Done;

                db.Todos.Update(todo);
                await db.SaveChangesAsync();
                return Ok(todo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("todos/{id}")]
        public async Task<IActionResult> DeleteAsync(
            [FromServices] AppDbContext db,
            [FromRoute] int id
        )
        {
            var todo = await db.Todos.FirstOrDefaultAsync(x => x.Id == id);

            if (todo == null)
                return NotFound();

            try
            {
                db.Todos.Remove(todo);
                await db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}