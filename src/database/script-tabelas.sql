create database beyond_analytics;

use beyond_analytics;

CREATE TABLE usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
   -- empresa varchar(100) UNIQUE NOT NULL,  
   -- nome VARCHAR(100), 
    email VARCHAR(100) UNIQUE NOT NULL, 
    senha VARCHAR(255) NOT NULL
  --  telefone CHAR(11)
);

select * from usuarios;

DROP DATABASE beyond_analytics;