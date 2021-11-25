# 1. Creacion de LOGIN y gestion de sesiones

## a. Creacion de vista LOGIN

## b. Crear la ruta GET de LOGIN

## c. Crear la ruta POST de LOGIN
    = Creacion de archivo "session" {session.js}
        - expres session
        - mongoconnect
    - Integrarlo en index.js
    - Verificar session en navegador (cookie) y MongoDB (session)

## d. Cerrar session
    - Arreglos en el Header del proyecto y su <nav>


## e. Patron de autorizacion (Areas privadas de la plataforma)
    - Determinacion de roles (Visitantes, Usuarios)
    - Route-guard (isLoggedIn vs isLoggedOut)
    - Verificar que en el Header aparezca