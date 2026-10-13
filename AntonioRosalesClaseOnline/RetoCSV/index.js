const fs = require("fs");

const INPUT_CSV = "videojuegos.csv";
const OUTPUT_DIR = "export";
const OUTPUT_JSON = `${OUTPUT_DIR}/${INPUT_CSV.split(".")[0]}.json`;

//Si no exitste el directorio de salida lo creamos
if(!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, {recursive : true});
    console.log(`Carpeta: ${OUTPUT_DIR} creada`);
}

//leer el CSV y normalizar los saltos de lineas posibles
let texto = fs.readFileSync(INPUT_CSV, "utf-8");
texto = texto.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

//a veces vienen csv o excels con lineas vacias de esta forma las vamos a eliminar
const lineas = texto.split("\n").filter((linea) => linea.trim() != "");
//console.log(lineas);
console.log("Lineas totales: ", lineas.length);

//Vamos a recuperar las cabeceras
const cabeceras = lineas[0].split(",").map((cabecera) => cabecera.trim());
//console.log(cabeceras);
console.log("Cabeceras Totales: ", cabeceras.length);

//Vamos a transformar mediante bucles todas las lineas en un array de objetos
const objetos = [];

for(let i=1; i<lineas.length; i++){
    //creamos una fila
    const fila = lineas[i];
    //sacamos las columnas
    const columnas = fila.split(",");
    //Inicializamos un objeto
    const objeto = {};

    //Recorremos las cabeceras
    for(let j=0; j<cabeceras.length; j++){
        objeto[cabeceras[j]] = (columnas[j] || "").trim();  
    }
    objetos.push(objeto);
}

console.log("Total de objetos creados", objetos.length);

//console.log(objetos);

//Convertir este array de objetos en un JSON
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(objetos, null, 2), "utf-8");