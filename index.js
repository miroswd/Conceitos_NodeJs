// Aplicação para armazenar projetos e tarefas

const express = require('express');
const server = express(); 

server.use(express.json()); // Permite a leitura de json

const projects = []; // Os projetos serão armazenados dentro de um array


// ------ Middlewares ------ //

// Validar se o projeto existe, através do id
function checkId(req,res,next) {
	// Deve ser aplicado apenas nos métodos que recebem o id
	const {id} = req.params; // Esse parâmetro já foi passado no método
	const project = projects.find(p=>p.id == id);
	if (!project) {
		// Se o projeto não for identicado pelo id, ele não existe
		return res.status(400).json({error:"Id was not found!"})
	}

	return next();
};

// Contar o número de requisições - pelo console
let count = 1; // Essa variável será alterada
function countReq(req,res,next) {
	console.log(count++);
	return next();
} 


/* --- UTILIZADO NA ROCKETSEAT ---
function logRequest(req,res,next) {
	console.count("Requests number")
	return next();
}

server.use(logRequests) // Toda vez que for utilizar o server
*/


// ------ Rotas ------ //

/*
// Rota de teste - verificar se o servidor está funcionando //

servet.get('/', (req,res) => {
	// Espera-se que a URL seja: htpp://localhost:3000
	return res.json({msg:"Hello World!"});
});
*/


// Criação de projetos
server.post('/projects', countReq, (req,res) => {
	const {id, title} = req.body // Dados recebidos pelo Insomnia
	const project = {
		id,
		title,
		tasks: []
	};	

	projects.push(project);
	return res.json(project);
});


// Listagem dos projetos
server.get('/projects', countReq, (req,res) => {
	return res.json(projects);
});


// Alterando apenas o título do projeto, buscado através do id na URL
server.put('/projects/:id', checkId, countReq, (req,res) => {
	const {id} = req.params; 	// Através da URL
	const {title} = req.body;	// Através de JSON

	// Precisa buscar o projeto através do id
	const project = projects.find(p=>p.id == id);
	project.title = title; // Substitui o título do projeto, pelo novo título obtido através do JSON

	return res.json(project); // Retorna o novo objeto
});


// Deletar projetos - baseado no id
server.delete('/projects/:id', checkId, countReq, (req,res) => {
	const {id} = req.params;
	const projectIndex = projects.findIndex(p=>p.id == id);

	projects.splice(projectIndex,1);
	return res.json(projects);
});


// Adicionar tarefas, via title, ao projeto
server.post('/projects/:id/tasks', checkId, countReq, (req,res) => {
	const {id} = req.params;
	const {title} = req.body;

	project = projects.find(p=> p.id == id);
	project.tasks.push(title); // Adiciona o title ao array tasks, do projeto escolhido pelo id

	return res.json(project);

});


// ------ Escuta as requisições ------ //
server.listen(3000);