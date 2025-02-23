README: Aplicación para un Contact Center 🚀

¡Bienvenido al repositorio de la Aplicación para un Contact Center! Aquí encontrarás todo lo que necesitas saber sobre este proyecto, desde cómo funciona hasta cómo sustentarlo sin morir en el intento. ¡Vamos al lío! 🎉

## ¿Qué es esto? 🤔
Imagina que eres el héroe de un Contact Center. Tu misión: desarrollar una aplicación que muestre información en tiempo real sobre los agentes (esos seres multitarea que atienden llamadas) y los clientes (esas almas en espera que necesitan ayuda). El backend está en .NET, y tú, como frontend developer, tienes que conectar todo esto con Next.js. ¡No hay presión! 😅

## Requerimientos 🎯
- **Lista de Agentes:** Nombre, estado (disponible, en llamada, en pausa) y tiempo en espera.
- **Lista de Clientes en Espera:** Nombre y tiempo de espera.
- **Filtros:** Filtrar agentes por estado y clientes por tiempo de espera.
- **Interacción con el Backend:** Llamadas API RESTful para obtener datos iniciales y WebSockets para actualizaciones en tiempo real.
- **Manejo de Estado Global:** Usar hooks como `useState`, `useEffect` y `useContext`.
- **Componentes Reutilizables:** ¡No copies y pegues código como si no hubiera un mañana!
- **Renderizado:** Del lado del cliente y del servidor (Next.js manda aquí).
- **WebSockets:** Para que todo se actualice en tiempo real (opcional, pero ¡qué bien queda!).
- **Rutas con App Router:** Porque las rutas son como los caminos de la vida, hay que saber usarlas.

## ¿Cómo funciona? 🛠️
### Estructura del Proyecto 🗂️
```



├── src
│   ├── app
│   │   ├── agents
│   │   │   └── page.js
│   │   ├── clients
│   │   │   └── page.js
│   │   ├── error.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.js
│   │   ├── page.js
│   │   └── websocket
│   │       └── route.js
│   ├── components
│   │   ├── agents
│   │   │   ├── agent-card.js
│   │   │   ├── agent-filters.js
│   │   │   └── agent-list.js
│   │   ├── clients
│   │   │   ├── client-card.js
│   │   │   ├── client-filters.js
│   │   │   └── client-list.js
│   │   └── ui
│   │       ├── alert.jsx
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       └── input.jsx
│   ├── data
│   │   ├── agents.js
│   │   ├── clients.js
│   │   └── constants.js
│   ├── lib
│   │   ├── api
│   │   ├── context
│   │   │   ├── agent-context.js
│   │   │   └── client-context.js
│   │   ├── hooks
│   │   │   └── useWebSocket.js
│   │   ├── utils
│   │   │   ├── formatters.js
│   │   │   └── websocket-service.js
│   │   └── utils.js
│   └── server
│       └── websocket.js
├── tailwind.config.js
└── tailwind.config.mjs

```

### Manejo de Estado 🧠
- **Context API:** Usamos `AgentContext` y `ClientContext` para manejar el estado global de agentes y clientes.
- **Hooks:** `useState` para estado local, `useEffect` para efectos secundarios y `useContext` para acceder al estado global.

### Actualizaciones en Tiempo Real ⚡
- **WebSockets:** Implementamos un hook personalizado `useWebSocket` para recibir actualizaciones en tiempo real.
- **Fetch API:** Para obtener los datos iniciales de agentes y clientes desde el backend.

### Componentes Reutilizables ♻️
- **`AgentCard` y `ClientCard`**: Tarjetas reutilizables para mostrar información.
- **`AgentList` y `ClientList`**: Listas que renderizan las tarjetas de agentes y clientes.
- **`AgentFilters` y `ClientFilters`**: Filtros que permiten buscar agentes por estado y clientes por tiempo de espera.

### Renderizado 🎨
- **Next.js:** Usamos SSR para mejorar el SEO y el rendimiento, y CSR para una experiencia dinámica.
- **App Router:** Las rutas `/agents` y `/clients` permiten navegar sin recargar la aplicación.

### Filtros y Query Params 🔍
- **Filtros:** Implementados con QueryParams.
- **Componentes de Filtros:** `AgentFilters` y `ClientFilters` manejan la lógica de filtrado.

### Diferencias entre MPA y SPA 🤔
- **MPA:** Cada página se carga desde el servidor. Bueno para SEO, pero puede ser más lento.
- **SPA:** La aplicación se carga una vez y las actualizaciones son dinámicas.
- **Next.js:** Combina lo mejor de ambos mundos con SSR y CSR.

### Conexión con el Backend 🔗
- **Simulación vs. Real:** Actualmente usamos datos locales simulados (`@/data/agents` y `@/data/clients`).
- **Fetch API:** Lista para conectarse con el backend y obtener datos en tiempo real.

## ¿Cómo sustentar esto? 📢
1. **Estructura de Componentes:** Explica cómo están organizados y por qué son reutilizables.
2. **Manejo de Estado:** Explica `useState`, `useEffect`, y `useContext`.
3. **Actualizaciones en Tiempo Real:** Explica cómo funcionan los WebSockets.
4. **Renderizado:** Diferencias entre SSR y CSR.
5. **Filtros:** Explica su implementación con QueryParams.
6. **Conexión con el Backend:** Explica la integración con la API real.

## Conclusión 🏁
Este proyecto cumple con casi todos los requisitos. Solo falta conectar con el backend real en lugar de usar datos simulados. ¡Pero eso es pan comido para ti! 🍞



¡Y eso es todo! Ahora ve y conquista ese Contact Center. 🎉

