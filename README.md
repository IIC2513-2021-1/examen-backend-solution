# Examen backend

Este proyecto fue construido con el template del curso (ya visto por ustedes en ambos proyectos) y expone una API REST con información sobre la carrera espacial de empresas privadas en 2021.

## Pre-requisitos para correr proyecto:
* PostgreSQL
  * Crear una base de datos en PostgreSQL con un nombre (ejemplo, `examen_dev`) y asignarle un user/password válido
* Node.js (ojalá 12.x, pero también puede ser 10.x)
* [Yarn](https://yarnpkg.com)

## Setup proyecto

* Clonar repositorio
* `cd examen-backend`
* (Opcional) Si usan `nvm`, cambiar a versión válida para el proyecto
  * `nvm use`
* Instalar dependencias:
  * `yarn install`
* Configurar base de datos con nombre y user/password dentro de `src/config/database.js`. Debe especificar tres variables de ambiente:
  * `DB_NAME`
  * `DB_USERNAME`
  * `DB_PASSWORD`
* Agregar variable de ambiente `JWT_SECRET` con algún valor arbitrario
* Correr migraciones
  * `yarn sequelize db:migrate`
* Correr seeds
  * `yarn sequelize db:seed:all`

## Ejecutar aplicación

```sh
yarn dev # o yarn start
```

## Probar endpoint

Para verificar que todo está bien:
- Ingresar (por browser, curl, Postman o similar) al endpoint: http://localhost:3000/api
- El resultado debiese ser un JSON con la siguiente estructura
  ```json
  {
    "message": "Bienvenido a la API del examen del curso IIC2513",
    "usersCount": 2
  }
  ```
- Además puedes probar los endpoints especificados en el enunciado del examen

¡Listo! Ya estás de condiciones de ejecutar y modificar la API del examen.

¡Éxito!
