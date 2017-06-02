<h2>Ejemplo de API REST con nodejs</h2>
<ol>
  <li>Descargar el proyecto</li>
  <li>Base de datos:  
  <p>
  <ul>
  <li>CREATE DATABASE nodejs;</li>
  <li>CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(250) NOT NULL,
  nombre VARCHAR(250) NOT NULL,
  password VARCHAR(100))</li>
   <li>CREATE TABLE customers (idcustomer INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  address VARCHAR(250) NOT NULL,
  email VARCHAR(250),
  phone VARCHAR(250))</li>
  </ul>
  </p>
  </li>
  
  <li>Entrar a la ruta del proyecto en consola, escribir "node app.js"</li>
  <li> <b>url: localhost:3000/api </b></li>

</ol
