# 🍰 CostOSmart App

**Aplicación móvil para gestión integral de pastelería**

## 📱 Características

- **Gestión de Usuarios**: Registro y autenticación segura
- **Inventario**: Control de ingredientes y stock
- **Productos**: Gestión de tortas y recetas
- **Ventas**: Registro y seguimiento de ventas
- **Dashboard**: Métricas y reportes en tiempo real
- **Navegación**: Interfaz intuitiva con drawer navigation

## 🚀 Tecnologías

- **React Native 0.79** con Expo SDK 53
- **React Navigation 6** para navegación
- **React Native Paper** para UI components
- **Axios** para comunicación con API
- **Expo SecureStore** para almacenamiento seguro
- **Hermes** como motor JavaScript

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Expo CLI
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo macOS)

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd costosmart-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` con tu configuración:
   ```env
   API_URL=https://tu-api-backend.com/api
   ```

4. **Iniciar el proyecto**
   ```bash
   npm start
   ```

## 🔧 Configuración

### API Configuration

La aplicación espera una variable `API_URL` en la configuración de Expo. Puedes configurarla usando un archivo `app.config.js` que lee desde variables de entorno:

```js
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    API_URL: process.env.API_URL,
  },
});
```

### TurboModules

**IMPORTANTE**: Mantén TurboModules habilitados (no establezcas `"turboModules": false`). Si los deshabilitas, la app fallará al iniciar con un error similar a:

```
TurboModuleRegistry.getEnforcing(...): 'PlatformConstants' could not be found
```

## 📱 Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web

# Prebuild del proyecto
npm run prebuild

# Build completo para Android
npm run build:android
```

## 🏗️ Estructura del Proyecto

```
app/
├── components/          # Componentes reutilizables
│   ├── Navigation.js   # Navegación principal
│   ├── LoadingSpinner.js # Componente de carga
│   └── styles.js       # Estilos globales
├── screens/            # Pantallas de la aplicación
│   ├── HomeScreen.js   # Dashboard principal
│   ├── LoginScreen.js  # Pantalla de login
│   ├── IngredientScreen.js # Gestión de ingredientes
│   ├── TortasScreen.js # Gestión de tortas
│   ├── RecetaScreen.js # Gestión de recetas
│   └── VentaScreen.js  # Gestión de ventas
├── controllers/        # Lógica de negocio
│   ├── UserController.js
│   ├── VentaController.js
│   ├── TortaController.js
│   ├── RecetaController.js
│   └── IngredientController.js
├── contexts/          # Contextos de React
│   └── AuthContext.js # Contexto de autenticación
├── src/
│   └── services/
│       └── api.js     # Configuración de API
├── utils/             # Utilidades
│   └── validations.js # Validaciones comunes
└── app.config.js      # Configuración de Expo
```

## 🔐 Autenticación

La aplicación utiliza un sistema de autenticación basado en tokens JWT:

- **Login**: Autenticación con email y contraseña
- **Registro**: Creación de nuevas cuentas
- **Persistencia**: Tokens almacenados de forma segura
- **Protección de rutas**: Navegación condicional según estado de auth

## 🎨 UI/UX

- **Material Design**: Implementado con React Native Paper
- **Tema consistente**: Colores y estilos unificados
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: Soporte para lectores de pantalla

## 🔧 Desarrollo

### Agregar nuevas pantallas

1. Crear archivo en `screens/`
2. Agregar ruta en `components/Navigation.js`
3. Implementar lógica en `controllers/` si es necesario

### Agregar nuevos endpoints

1. Actualizar `src/services/api.js` si es necesario
2. Crear métodos en el controller correspondiente
3. Implementar en las pantallas

## 🚀 Despliegue

### Android

```bash
npm run build:android
```

### iOS

```bash
npm run ios
```

## 📊 Monitoreo y Debugging

- **Expo DevTools**: Para debugging en desarrollo
- **React Native Debugger**: Para debugging avanzado
- **Flipper**: Para inspección de red y estado

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si encuentras algún problema:

1. Revisa la documentación
2. Busca en issues existentes
3. Crea un nuevo issue con detalles del problema

---

**Desarrollado con ❤️ para la gestión eficiente de pastelerías**
