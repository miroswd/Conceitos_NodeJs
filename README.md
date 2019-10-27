<h1>Desafio 01 - Conceitos NodeJS</h1>
<h4>Aplicação que armazena projetos e suas tarefas</h4>

<h2>Tecnologias utilizadas</h2>
<ul>
  <li>VSCode</li>
  <li>NodeJS</li>
  <li>Insomnia</li>
  <li>Express</li>
 </ul>
 
 <h2>Funcionamento</h2>
 Há 5 métodos configurados:

- `POST /projects`: É criado o projeto, no formato JSON `{ id: "1", title: "Projeto", tasks: [ ] }`

- `GET /projects`: Permite a visualização de todos os projetos criados

- `PUT /projects/:id`: Altera o <b>título</b> do projeto com o `id` que é passado na URL

- `DELETE /projects/:id`: Deleta o projeto com o `id` presente nos parâmetros da rota

- `POST /projects/:id/tasks`: Adiciona um array com as tarefas do projeto, no projeto que contém o `id`

 
   
