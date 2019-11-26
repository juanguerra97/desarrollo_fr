# PlanUMG

Frontend del proyecto PlanUMG desarrollado en el curso de Desarrollo Web 2019. 
Esta aplicación permite registrar las asignaciones de horarios de cursos y catedráticos y genera reportes en formato PDF que se pueden descargar o enviar por correo electrónico.

## Tecnolog&iacute;as utilizadas

- [TypeScript](https://www.typescriptlang.org/) 
- [Angular](https://angular.io/)
- [Apache Cordova](https://cordova.apache.org/)
- [CoreUI](https://coreui.io/angular/)
- [Bootstrap](https://getbootstrap.com/)

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

#### Primero descargar el proyecto
1. Clonar el repositorio
```
git clone https://github.com/fkrazy/desarrollo_fr.git
```
2. Entrar a la carpeta del proyecto
``` 
cd desarrollo_fr
```
3. Inicializar Git Flow
```
git flow init
```
Darle ENTER a todo excepto que a la rama develop ponerle devel

![alt text](https://github.com/fkrazy/desarrollo_fr/raw/devel/docs/img/gitflowinit.png "resultado de git flow init") 

4. Instalar las dependencias
``` 
npm install
```

#### Uso de git flow

1. Cuando vayan a realizar un cambio grande, por ejemplo agregar un nueva pantalla, crear una nueva 'feature'
```
git flow feature start <nombrefeature>
```
>Sustituye <nombrefeature\> por cualquier nombre identificativo del cambio a realizar

   >Git Flow creará una rama con el nombre feature/\<nombrefeature\> que será la rama donde harás tus cambios
2. Hacer commit de todos los cambios como siempre se hace en git

3. Cuando hayas terminado y hecho commit a todos los cambios, finalizar la 'feature'
``` 
git flow feature finish
```
>Todos los cambios realizados en la 'feature' se 'mezclaran' en la rama devel

>Nota: cuando vayan a hacer un cambio pequeño o un cambio que no tardarás en realizar, por ejemplo modificar una función, etc. puedes hacer los cambios directamente en la rama devel sin necesidad de crear una 'feature'

#### Mandar los cambios a GitHub

1. Verifica que estás en la rama devel
```
git branch
```
>La rama devel debe tener un asterisco al inicio

![alt text](https://github.com/fkrazy/desarrollo_fr/raw/devel/docs/img/gitbranch.png "resultado de git flow init") 

2. Si no estás en la rama devel cambiate a ella
```
git checkout devel
```
3. Obtener últimos cambios realizados al proyecto por otros
```
git pull origin devel
```
>Si hay conflictos, resolverlos y hacer commit
4. Mandar los cambios realizados
```
git push origin devel
```
