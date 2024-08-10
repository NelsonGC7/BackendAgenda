
const express = require('express')
const cors = require('node:cors')
const app = express()
const personas = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];
app.use(express.json())
app.use(cors())

app.get('/persons',(req,res)=>{
    res.status(200).json(personas);

})
app.get('/info',(req,res)=>{
    console.log(res)
    res.status(200)
    res.send(`<h1>people in agenda ${personas.length}</h1>
            </br>
            `)
})
app.get('/persons/:id',(req,res)=>{
    const id  = Number(req.params.id)
    const indexPerson = personas.findIndex(persona=> persona.id === id)
    if(indexPerson=== -1){
        return res.status(404).send({ error: 'Person not found' });
    }
    res.status(200)
    res.json(personas[indexPerson])
})

app.delete('/persons/:id',(req,res)=>{
    console.log(req.params.id)
    const{ id } = req.params
    const indexObject = personas.findIndex(persona=> persona.id === Number(id))
    if(indexObject === -1){
       
        return res.status(404).json({msj:"id not found"})
    }
   
    personas.splice(indexObject,1)
    console.log(personas)
     res.status(205).json(personas)
})

app.post('/persons',(req,res)=>{
 const { name,number}=req.body
	const random = Math.random()
	const newPerson = {
		id: random * personas.length,
		name: name,
		number:  number,
	}
	const identica = personas.filter(personas=> personas.name === name)
	if(identica.length>0){
		return res.status(409).json({msj:"there is a similar contact in your agend"})
	}
	if(typeof name === "string" && typeof number === "string" && name.length > 0 && number.length>5){
		if(newPerson){
			personas.push(newPerson)
			console.log(identica.length)
			res.status(201).json({mjs:"created"})
		}else{
			res.status(401).send("not object")
		}
		
	}else{
		return res.status(401).json({msj:"object not ecual"})
	}
	
})
	
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server in http://localhost:${PORT}`)

})	
