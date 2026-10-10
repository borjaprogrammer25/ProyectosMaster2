// Creando un fichero 
const fs = require("fs");
const crypto = require("crypto");

/*fs.writeFile(
    "archivoNuevo.txt", 
    "Hola bienvenidos a Backend con NodeJS, scripting y javascript", 
    "utf-8", 
    (error) => {
        if (error){
            console.error("No se ha podido escribir el nuevo fichero");
            return;
        }
        console.log("Fichero creado");
    }
);*/

fs.readFile("archivoNuevo.txt", "utf-8", (error, data) => {
    if(error){
        console.error("No se puede leer el fichero");
        return;
    }
    //console.log(data);
    const newDataA = data.replaceAll("a", "o");
    const newDataB= newDataA.replaceAll("e", "o");
    const newDataC= newDataB.replaceAll("i", "o");
    const newDataD= newDataC.replaceAll("u", "o");
    console.log(newDataD);

});

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('MiClaveSecreta', 'salt', 32);

function encrypt(text){
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')}
}

function decrypt(text, iv){
    let ivBuffer = Buffer.from(iv, 'hex');
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), ivBuffer);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const encriptado = encrypt('ThePower');
console.log(encriptado);

const desencriptado = decrypt(
'fc501aa4d6a6db292a66ec9fdf0e9911',
'9dec12928c2f530159edda1a29b090a3'
);
console.log(desencriptado);

//Reto encriptar y desencriptar un fichero
/*fs.writeFile(
    "archivoCripto.txt", 
    "Esto es una prueba para encriptar un fichero y luego desencriptarlo", 
    "utf-8", 
    (error) => {
        if (error){
            console.error("No se ha podido escribir el nuevo fichero");
            return;
        }
        console.log("Fichero creado");
    }
);*/
fs.readFile("archivoCripto.txt", "utf-8", (error, data) => {
    if(error){
        console.error("No se puede leer el fichero");
        return;
    }
    console.log("-> 1. Contenido original leido del Fichero = " + data);

     // Encriptamos los datos reales del archivo ('data')
    const ficheroEncriptado = encrypt(data);
    // Al ser un objeto, usamos JSON.stringify para imprimirlo bien en consola
    console.log("-> 2. Fichero encriptado (Objeto completo) = ", ficheroEncriptado);
    console.log("-> 2b. Solo el texto cifrado = " + ficheroEncriptado.encryptedData);

    // Pasamos el texto cifrado y el IV de manera independiente a decrypt()
    const ficheroDesencriptado = decrypt(ficheroEncriptado.encryptedData, ficheroEncriptado.iv);
    
    console.log("-> 3. Fichero desencriptado = " + ficheroDesencriptado);
});