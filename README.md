# ActivateCH Landing Page

Una landing page moderna para ActivateCH construida con Next.js, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Componentes UI Modernos**: Utilizando Radix UI y Tailwind CSS
- **Base de Datos en Tiempo Real**: Integración con Supabase
- **Panel de Administración**: Gestión de productos, contactos y contenido
- **Integración con Instagram**: Muestra posts de Instagram en tiempo real
- **Conversión de Monedas**: Soporte para USD y ARS
- **Chat Widget**: Sistema de chat integrado

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [pnpm](https://pnpm.io/) (recomendado) o npm
- [Git](https://git-scm.com/)

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/activatech-landing.git
   cd activatech-landing
   ```

2. **Instala las dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   
   # Optional: Instagram API (if needed)
   INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
   
   # Optional: Currency API (if needed)
   CURRENCY_API_KEY=your_currency_api_key_here
   ```

4. **Configura Supabase**
   
   - Crea una cuenta en [Supabase](https://supabase.com/)
   - Crea un nuevo proyecto
   - Ejecuta los scripts SQL en `scripts/create-tables.sql` para crear las tablas necesarias
   - Copia la URL y la clave anónima de tu proyecto a las variables de entorno

5. **Ejecuta el proyecto en modo desarrollo**
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

6. **Abre tu navegador**
   
   El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
activatech-landing/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   ├── api/               # API routes
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── admin/            # Componentes del panel admin
│   ├── ui/               # Componentes UI reutilizables
│   └── ...               # Otros componentes
├── lib/                  # Utilidades y configuración
├── public/               # Archivos estáticos
├── scripts/              # Scripts SQL para la base de datos
└── styles/               # Estilos adicionales
```

## 🗄️ Base de Datos

El proyecto utiliza Supabase como base de datos. Las tablas principales incluyen:

- `products`: Productos y servicios
- `contact_info`: Información de contacto
- `currency_rates`: Tasas de cambio
- `instagram_posts`: Posts de Instagram

Ejecuta el script `scripts/create-tables.sql` en tu proyecto de Supabase para crear las tablas necesarias.

## 🚀 Scripts Disponibles

- `pnpm dev` - Ejecuta el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Ejecuta la aplicación en modo producción
- `pnpm lint` - Ejecuta el linter

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com/)
2. Configura las variables de entorno en el dashboard de Vercel
3. ¡Listo! Tu aplicación se desplegará automáticamente

### Otros Proveedores

El proyecto es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos:

- Email: contacto@activatech.com
- Website: https://activatech.com

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework de React
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Radix UI](https://www.radix-ui.com/) - Componentes UI accesibles
- [Supabase](https://supabase.com/) - Backend como servicio 