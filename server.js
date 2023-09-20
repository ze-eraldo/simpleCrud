import app from "./src/app.js";

const PORT = 3000;

// configuração da porta de escuta
app.listen(PORT, () =>{
    console.log("servidor ativo");
});