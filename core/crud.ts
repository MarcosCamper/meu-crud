//const fs = require('fs');
import fs from 'fs';
import { v4 as uuid } from 'uuid'; //Biblioteca de criação de ID's
console.log("[CRUD]");
const DB_FILE_PATH = "./core/db";

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}


function create(content: string) :Todo{
  //salvar o content no sistema
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,  
  };


  const todos: Array<Todo> = [
    ...read(),
    todo,
  ]

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos,
  }, null, 2));
  return todo;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) { //fail fast validation
    return [];
  }
  return db.todos;
}
function update(id: string, PartialTodo: Partial<Todo>): Todo{
  let updateTodo;
  const todos = read();
  todos.forEach((currentTodo) =>{
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updateTodo = Object.assign(currentTodo, PartialTodo);
  }
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(
    {
      todos,
    }, null, 2
  ))

  if (!updateTodo){
    throw new Error("Please, provide another ID!")
  }
  return updateTodo;
}

function updateContentById(id: string, content: string): Todo {
  return update(id,
    {content,})
}

function CLEAR_DB(){
  fs.writeFileSync(DB_FILE_PATH, "");
}

// SIMULATION
CLEAR_DB();
const primeiraTodo = create("Primeira To DO");
const segundaTodo = create("Primeira To DO");
const terceiraTodo = create("Segunda To DO");
// update(terceiraTodo.id, {
//   content: "Atualizada",
//   done: true,
// });
updateContentById(segundaTodo.id, "Segunda TODO Atualizada");
console.log(read());
