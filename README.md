# NINJA-BELTS-LAMBDA



## Estructura del repositorio:

Este repositorio está dividido incrementalmente en distintas ramas:

- **feature/initial-status-retrieve-ninja-belt-points**: "Esqueleto andante" de la lambda `retrieveBeltPoints`, con el boilerplate inicial ya creado y un test e2e fallando por el motivo correcto (caso de uso no implementado)

- **feature/retrieve-ninja-belt-points**: lambda `retrieveBeltPoints` implementada (con repositorio de puntos en memoria), con test unitarios (aceptación) y test e2e

- **feature/all-belts-actions**: ejemplo de dos lambdas con test e2e, de infraestructura y unitarios. Estas lambdas usan adaptadores de servicios de AWS y están probadas apoyándose en serverless-offline y distintos plugins de servicios AWS fake, para poder realizar testing e2e y de infraestructura desde local

- **feature/all-belts-actions-with-localstack**: ejemplo de dos lambdas con test e2e, de infraestructura y unitarios. Estas lambdas usan adaptadores de servicios de AWS, sus test e2e y de infraestructura se apoyan en localstack para poder realizar estos test desde local