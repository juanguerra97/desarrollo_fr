# PlanUMG

Frontend del proyecto PlanUMG desarrollado en el curso de Desarrollo Web 2019. 
Esta aplicación permite registrar las asignaciones de horarios de cursos y catedráticos y genera reportes en formato PDF que se pueden descargar o enviar por correo electrónico.


## Capturas de pantalla
![Inicio de sesión](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura01.PNG "Pantalla de inicio de sesión")

![Asignaciones](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura02.PNG "Pantalla de asignaciones")

![Asignaciones](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura03.PNG "Pantalla de asignaciones")

![Eliminación de asignación](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura04.PNG "Pantalla de asignaciones")

![Nueva asignación](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura05.PNG "Pantalla de asignaciones")

![Planificaciones](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura06.PNG "Reporte de planificaciones")

![PDF](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura07.PNG "Reporte en PDF")

![Envio de reporte por correo](https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura08.PNG "Envío de reporte por correo electrónico")

<img src="https://github.com/juanguerra97/planumg_frontend/raw/master/docs/img/captura09.png" width="50%">


<strong>INSTRUCCIONES GIT FLOW</strong>
  1) descargan e instalan git flow
  2) git clone ...
  3) git flow init
  4) al darle a init les pedira los nombres para cada tipo de rama le dan enter a todas excepto a develop que le ponen devel
  4) git flow feature start nombre_cualquiera
  
 <strong>AL TERMINAR </strong>
  1) git flow feature finish nombre_cualquiera
  2)subir devel al servidor con git normal

### ¿Cómo colaborar?

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
