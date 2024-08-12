# Sistema Consulta Vehiculos

Sistema hecho para busqueda y agregar autos

## Descripción del Proyecto

Este proyecto es una API para gestionar vehículos. Permite agregar, buscar y listar vehículos almacenados en una base de datos. El frontend está desarrollado en Vue.js y el backend en Node.js.

## Instrucciones para Ejecutar el Proyecto Localmente

1. Clonar el repositorio:
 
 git clone https://github.com/JAGERIRST/Sistema_Consulta_Vehiculos.git

2. Navegar dentro del proyecto
cd Sistema_Consulta_Vehiculos

3. Instalar las dependencias del backend:
npm install

4. Instalar las dependencias del frontend:
cd client
npm install

5. Ejecutar el backend: 
cd en Sistema_Consulta_Vehiculos
npm start

6. Ejecutar el frontend: 

cd en client
npm run serve

7. Abrir el navegador y visitar http://localhost:8080

## Modelamiento de la Solución

El proyecto está estructurado en dos partes principales: el backend y el frontend. 

- **Backend:** Implementado en Node.js, expone una serie de endpoints REST para la gestión de vehículos. Los datos se modelan utilizando un esquema simple de JSON que representa las propiedades de un vehículo (marca, modelo, versión, patente, VIN, etc.).
  
- **Frontend:** Implementado en Vue.js, proporciona una interfaz de usuario para interactuar con la API. Permite agregar nuevos vehículos, buscar por patente o VIN, y listar todos los vehículos.

### Justificación de las Rutas de los Endpoints

- `GET /api/vehicles`: Retorna la lista de todos los vehículos registrados.
- `GET /api/vehicles/search`: Busca un vehículo por patente.
- `GET /api/vehicles/search/vin`: Busca un vehículo por VIN.
- `POST /api/vehicles`: Agrega un nuevo vehículo.

## Justificación de tecnologias

El uso de node fue por el hecho que es una de las mejores herramientas para el uso en backed, si bien habia pensado en ocupar herramientas como Python decidi por node aparte de ser un framework de trabajo más utilizado.
En el caso del FrontEnd con Vue la verdad fue un reto personal, es primera vez que ocupo Vue y es un FrameWork muy famoso parecido un poco a react pero para proyectos más sencillos o pequeños, la razon de haber ocupado Vue
for por el hecho de que es más facil de utilizar como front end, más facil de conectarlo con el BackEnd y además como reto personal, es primera vez que lo ocupo.

Las rutas están diseñadas para seguir la convención RESTful, asegurando que cada operación en el sistema tenga una semántica clara y definida.

## Contacto

Si tienen alguna pregunta contactenme por di.uribec1@gmail.com  mi JAGERIRST (https://github.com/JAGERIRST).
