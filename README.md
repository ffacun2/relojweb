# RelojWeb

**Pagina web que implementa Reloj Mundial, Cronometro, Temporizador, Alarma y Calendario**

## Estructura del Proyecto
El proyecto está estructurado de la siguiente manera:
```
relojweb/
├── assets/
│   └── img/              # Iconos e imágenes
├── src/
│   ├── css/              # Archivos CSS
│   │   ├── alarma.css
│   │   ├── calendario.css
│   │   ├── cronometro.css
│   │   ├── reloj.css
│   │   ├── style.css
│   │   └── temporizador.css
│   ├── script/           # Archivos JavaScript
│   │   ├── alarma.js
│   │   ├── calendario.js
│   │   ├── cronometro.js
│   │   ├── paises.js
│   │   ├── reloj.js
│   │   ├── script.js
│   │   └── temporizador.js
│   └── html/             # Archivos HTML
│       ├── alarma.html
│       ├── calendario.html
│       ├── cronometro.html
│       ├── index.html
│       └── temporizador.html
└── README.md

```
### Reloj Mundial
La funcionalidad de Reloj Mundial permite visualizar la hora actual en diferentes zonas horarias.

- Archivos involucrados:
  - HTML: index.html
  - CSS: reloj.css
  - JavaScript: reloj.js, paises.js
- Descripción:
  - El archivo reloj.js contiene la lógica para obtener y mostrar la hora y fecha de diferentes zonas horarias. Utiliza el archivo paises.js que contiene un objeto con los datos de los países y sus respectivas zonas horarias.
  - Los datos de los relojes se almacenan en localStorage para persistencia.

### Cronómetro
El cronómetro permite medir el tiempo transcurrido desde que se inicia hasta que se detiene.

- Archivos involucrados:
  - HTML: cronometro.html
  - CSS: cronometro.css
  - JavaScript: cronometro.js
- Descripción:
  - El archivo cronometro.js contiene la lógica para iniciar, pausar y reiniciar el cronómetro. También permite marcar vueltas (flags) y mostrar tiempos parciales.

### Temporizador
El temporizador cuenta regresivamente desde un tiempo establecido hasta llegar a cero.

- Archivos involucrados:
  - HTML: temporizador.html
  - CSS: temporizador.css
  - JavaScript: temporizador.js
- Descripción:
  - En temporizador.js se maneja la lógica para configurar el tiempo (horas, minutos, segundos), iniciar, pausar y reiniciar el temporizador. Al llegar a cero, se muestra una alerta.

### Alarma
La alarma permite configurar recordatorios a una hora específica.

- Archivos involucrados:
  - HTML: alarma.html
  - CSS: alarma.css
  - JavaScript: alarma.js
- Descripción:
  - El archivo alarma.js contiene la lógica para agregar, editar y eliminar alarmas. También gestiona la reproducción de sonidos cuando la alarma se activa.

### Calendario
El calendario muestra un calendario mensual interactivo, permitiendo navegar entre meses y años.

- Archivos involucrados:
  - HTML: calendario.html
  - CSS: calendario.css
  - JavaScript: calendario.js, semanas.js
- Descripción:
  - En calendario.js se encuentra la lógica para renderizar el calendario mensual, incluyendo la navegación entre meses y años. Utiliza el archivo semanas.js para obtener los nombres de los días y meses.

### Cómo Funciona
#### Modo Oscuro
- Descripción:
  - La aplicación incluye un modo oscuro que se puede alternar mediante un botón en la barra de navegación. La preferencia del modo oscuro se guarda en localStorage para persistencia.

#### Navegación y Diseño
- Descripción:
  - La navegación principal de la aplicación se encuentra en la barra lateral (nav), que permite acceder a las diferentes funcionalidades (Reloj, Cronómetro, Temporizador, Alarma, Calendario).
  - Los estilos generales de la aplicación están en style.css, que define la apariencia de la barra de navegación, el encabezado y el contenido principal.
 
## Tecnologías Utilizadas

Este proyecto está desarrollado utilizando las siguientes tecnologías:

- **JavaScript**: Para la lógica y funcionalidad de la aplicación.
- **HTML**: Para la estructura de la página web.
- **CSS**: Para el diseño y estilo de la interfaz de usuario.
