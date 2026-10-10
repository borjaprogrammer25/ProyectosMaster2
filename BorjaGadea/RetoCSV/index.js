const fs = require("fs");

function csvToJson(csvText) {
  // 1. Limpiar espacios en blanco al inicio/final y dividir por saltos de línea
  const lines = csvText.trim().split(/\r?\n/);
  
  // 2. Extraer la primera línea como las claves (headers)
  const headers = lines[0].split(',');

  // 3. Iterar sobre las filas restantes y transformarlas en objetos
  const jsonArray = lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};

    headers.forEach((header, index) => {
      obj[header.trim()] = values[index] ? values[index].trim() : null;
    });

    return obj;
  });

  // 4. Devolver la estructura final en formato JSON string
  return JSON.stringify(jsonArray, null, 2);
}

try {
  // 1. Leemos el contenido real del archivo CSV
  const contenidoCSV = fs.readFileSync("miCSV.csv", "utf-8");
  console.log("--- Contenido del CSV leído con éxito ---");

  // 2. Convertimos ese contenido de texto a formato JSON string
  const resultadoJson = csvToJson(contenidoCSV);

  // 3. Escribimos el string JSON resultante en el nuevo archivo .json (o .txt)
  fs.writeFileSync("bdSuperHeroes.json", resultadoJson, "utf-8");
  console.log("Fichero creado y guardado con éxito como bdSuperHeroes.json");
  
  // 4. Mostramos el resultado por consola
  //console.log("\n--- Resultado JSON ---");
  //console.log(resultadoJson);

} catch (error) {
  console.error("Ha ocurrido un error procesando el archivo:", error.message);
}
