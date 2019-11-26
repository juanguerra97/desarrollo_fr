# PlanUMG

Frontend del proyecto PlanUMG desarrollado en el curso de Desarrollo Web 2019. 
Esta aplicación permite registrar las asignaciones de horarios de cursos y catedráticos y genera reportes en formato PDF que se pueden descargar o enviar por correo electrónico.

## Tecnolog&iacute;as utilizadas

- [TypeScript](https://www.typescriptlang.org/) 
- [Angular](https://angular.io/)
- [Apache Cordova](https://cordova.apache.org/)
- [CoreUI](https://coreui.io/angular/)
- [Bootstrap](https://getbootstrap.com/)


## Ejecuci&oacute;n de la aplicaci&oacute;n

1. Clonar el repositorio
    ```
    git clone https://github.com/juanguerra97/planumg_frontend.git
    ```
1. Moverse al directorio del repositorio clonado
    ```
    cd planumg_frontend
    ```
1. Instalar dependencias
    ```
    npm i
    ```
1. Ejecutar el servidor
    > El servidor lo puedes encontrar en el siguiente link: https://github.com/juanguerra97/planumg_backend
1. Ejecutar la aplicaci&oacute;n web
    ```
    npm start
    ```
    La aplicaci&oacute;n se ejecutar&aacute; por defecto en el puerto 4200 por lo tanto ve a la direcci&oacute;n http://localhost:4200.
    
    > El usuario es **Admin** y la contrase&ntilde;a **Admin**

> La aplicaci&oacute;n se conectar&aacute; al servidor en http://localhost:4000, si est&aacute;s ejecutando el servidor en otra direcci&oacute;n o puerto debes ir al archivo en *src/environments/environment.ts* y en *apiURL* coloca la direcci&oacute;n del servidor.                                                                                                                                                                                                   
## Capturas de pantalla

<p float="left">
<img alt="Inicio de sesión" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura01.PNG" width="47%">

<img alt="Asignaciones" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura02.PNG" width="47%">

<img alt="Asignaciones" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura03.PNG" width="47%">

<img alt="Eliminaci&oacute;n de asignaci&oacute;n" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura04.PNG" width="47%">

<img alt="Nueva asignaci&oacute;n" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura05.PNG" width="47%">

<img alt="Planificaciones" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura06.PNG" width="47%">

<img alt="Reporte en PDF" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura07.PNG" width="47%">

<img alt="Reporte por correo" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura08.PNG" width="47%">

</p>
<img alt="Correo con reporte en PDF" src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura09.png" height="350px">


___

## ¿Cómo colaborar?


#### Descargar el proyecto

1. Clonar el repositorio
    ```
    git clone https://github.com/fkrazy/desarrollo_fr.git
    ```
1. Entrar a la carpeta del proyecto
    ``` 
    cd desarrollo_fr
    ```
1. Inicializar GitFlow
    ```
    git flow init
    ```
    >Darle ENTER a todo excepto que a la rama **develop** ponerle **devel**

    ![alt text](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/gitflowinit.png "resultado de git flow init") 

1. Instalar las dependencias
    ``` 
    npm i
    ```

#### Uso de git flow

1. Cuando vayan a realizar un cambio grande, por ejemplo agregar un nueva pantalla, crear una nueva 'feature'
    ```
    git flow feature start <nombrefeature>
    ```
    >Sustituye <nombrefeature\> por cualquier nombre identificativo del cambio a realizar

   >Git Flow creará una rama con el nombre feature/\<nombrefeature\> que será la rama donde harás tus cambios
1. Hacer commit de todos los cambios, como siempre se hace en git

1. Cuando hayan terminado y hecho commit a todos los cambios, finalizar la 'feature'
    ``` 
    git flow feature finish
    ```
    >Todos los cambios realizados en la 'feature' se 'mezclaran' en la rama devel

    >Nota: cuando vayan a hacer un cambio pequeño o un cambio que no tardar&aacute;s en realizar, por ejemplo modificar una función, etc. pueden hacer los cambios directamente en la rama devel sin necesidad de crear una 'feature'

#### Mandar los cambios a GitHub

1. Verifiquen que est&aacute;n en la rama devel
    ```
    git branch
    ```
    >La rama devel debe tener un asterisco al inicio

    ![alt text](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/gitbranch.png "resultado de git flow init") 

1. Si no est&aacute;n en la rama devel, cambiarse a ella
    ```
    git checkout devel
    ```
   
1. Obtener últimos cambios realizados al proyecto por otros
    ```
    git pull origin devel
    ```
    >Si hay conflictos, resolverlos y despu&eacute;s hacer commit
                                                                                                         
1. Mandar los cambios realizados
    ```
    git push origin devel
    ```

## Autores

- Juan Guerra - [juanguerra97](https://github.com/juanguerra97)
- Hancel Guzm&aacute;n - [HancelGH](https://github.com/HancelGH)
- Allan L&oacute;pez - [EdGames05](https://github.com/EdGames05)
- Frank Orozco - [fkrazy](https://github.com/fkrazy)
