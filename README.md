# Next.js TesloShop App

Para correr localmente, se necesita la base de datos.

```
docker-compose up -d
```

- El -d, significa **detached**

- MongoDB URL Local:

```
mongodb://localhost:27019/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- Reconstruir los módulos de node y levantar Next

```
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas

Llamada:

```
http://localhost:3000/api/seed
```
