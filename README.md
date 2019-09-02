mucha lean aca como iniciar
https://coreui.io/docs/getting-started/introduction/

el proyecto ya esta en devel de ahi pueden jalar para comenzar

este es gitflow https://danielkummer.github.io/git-flow-cheatel 
las vistas para los reportes estan en src/app/views/reportes, los scripts ban en el .ts y el html en el..html


para hacer inputs y demas pueden hechar un vistaso aca https://getbootstrap.com/docs/4.0/components/forms/

cualquier duda me avisan


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

####Primero descargar el proyecto
1. Clonar el repositorio
```sh
git clone https://github.com/fkrazy/desarrollo_fr.git
```
2. Entrar a la carpeta del proyecto
```sh 
cd desarrollo_fr
```
3. Inicializar Git Flow
```sh 
    git flow init
```
Darle ENTER a todo excepto que a la rama develop ponerle devel

![alt text](https://github.com/fkrazy/desarrollo_fr/raw/devel/docs/img/gitflowinit.png "resultado de git flow init") 

4. Instalar las dependencias
```sh 
npm install
```

#### Uso de git flow

1. Cuando vayan a realizar un cambio grande, por ejemplo agregar un nueva pantalla, crear una nueva 'feature'
```sh 
git flow feature start <nombrefeature>
```
>Sustituye <nombrefeature\> por cualquier nombre identificativo del cambio a realizar

   >Git Flow creará una rama con el nombre feature/\<nombrefeature\> que será la rama donde harás tus cambios
2. Hacer commit de todos los cambios como siempre se hace en git

3. Cuando hayas terminado y hecho commit a todos los cambios, finalizar la 'feature'
```sh 
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
3. Obtener últimos cambios realizados el proyecto por otros
```
git pull origin devel
```
>Si hay conflictos, resolverlos y hacer commit
4. Mandar los cambios realizados
```
git push origin devel
```
