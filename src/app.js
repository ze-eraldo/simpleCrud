import express from "express";

// todo o código do express está aqui
const app = express();
//middleware
app.use(express.json());

const carros= [
    {
        licensePlate: "ABC-123",
        name: "Short distances",
        brand: "Fiat",
        model: "Fiorino",
        year: 2020,
        odometer:12345,
        category: "Delivery"
    },
    {
        licensePlate: "ABC-1D23",
        name: "Long distances",
        brand: "Toyota",
        model: "Yaris",
        year: 2021,
        odometer:12345,
        category: "Delivery"
    }
]
// funcao para buscar o carro pela placa
function buscarCarro(licensePlate){
    return carros.findIndex(carros=>{
        return carros.licensePlate === String(licensePlate);
    })

}

// sem rota trás apenas que é um projeto
app.get("/",(req,res)=>{
    res.status(200).send("CRUD simples com EXPRESS");
})
//tras todos os veiculos
app.get("/veiculos",(req, res)=>{   
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type':'application/json'
    });
    res.status(200).json(carros);
    
})

// tras apenas um carro
app.get("/veiculos/:licensePlate",(req,res)=>{
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    const index = buscarCarro(req.params.licensePlate);
    res.status(200).json(carros[index]);
}) 

// cria um novo carro
app.post("/veiculos", (req,res)=>{
    try{
        res.set({
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type':'application/json; charset=utf-8',
            'Accept': 'application/json'
        }); 
        carros.push(req.body);
        res.status(201).json(carros);

    }catch(error){
        console.log(error) 
    }
    
})

// alterar um carro
app.put("/veiculos/:licensePlate",(req,res)=>{
    const index = buscarCarro(req.params.licensePlate);
    carros[index]= req.body;
    res.status(200).json(carros);
})
// deletar um carro
app.delete('/veiculos/:id', (req, res) => {
    const index = buscarCarro(req.params.id);
    carros.splice(index, 1);
    res.status(200).send('Carro removido com sucesso.');
  }); 

  /*
  ===============================================
  manutencao
  ===============================================
  */
 const manutencao =[
    {
    licensePlate: 'AXX-1244',
    date: '02/02/2023',
    value: 100,
    referenceOdometer: 1000,
    readOdometer: 1000,
    description: 'Breaks'
    }
]
//tras todas as manutencoes
app.get("/revisao",(req, res)=>{
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type':'application/json'
    });
    res.status(200).json(manutencao);
    
})
// cria nova manutencao
app.post("/revisao", (req,res)=>{
    try{
        res.set({
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type':'application/json; charset=utf-8',
            'Accept': 'application/json'
        }); 
        manutencao.push(req.body);
        res.status(201).json(manutencao);

    }catch(error){
        console.log(error) 
    }
    
})
// alterar uma manutencao
app.put("/revisao/:licensePlate",(req,res)=>{
    const index = buscarCarro(req.params.licensePlate);
    manutencao[index]= req.body;
    res.status(200).json(manutencao);
})

export default app;