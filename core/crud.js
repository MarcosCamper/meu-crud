const fs = require('fs');
console.log("[CRUD]");
const DB_FILE_PATH = "./core/db";

function create(content){
  //salvar o content no sistema
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

// SIMULATION

console.log(create("Hoje gravar todas as aulas!"));