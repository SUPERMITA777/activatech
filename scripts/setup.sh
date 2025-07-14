#!/bin/bash

# Script de configuración para ActivateCH Landing Page
echo "🚀 Configurando ActivateCH Landing Page..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versión 18 o superior es requerida. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Verificar si pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo "📦 Instalando pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm --version) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
pnpm install

# Crear archivo .env.local si no existe
if [ ! -f .env.local ]; then
    echo "🔧 Creando archivo .env.local..."
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Instagram API (if needed)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here

# Optional: Currency API (if needed)
CURRENCY_API_KEY=your_currency_api_key_here
EOF
    echo "⚠️  Por favor configura las variables de entorno en .env.local"
fi

# Verificar si Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado. Por favor instala Git desde https://git-scm.com/"
    exit 1
fi

echo "✅ Git $(git --version) detectado"

# Inicializar Git si no está inicializado
if [ ! -d .git ]; then
    echo "🔧 Inicializando repositorio Git..."
    git init
    git add .
    git commit -m "Initial commit: ActivateCH Landing Page"
fi

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las variables de entorno en .env.local"
echo "2. Crea un proyecto en Supabase y ejecuta los scripts SQL"
echo "3. Ejecuta 'pnpm dev' para iniciar el servidor de desarrollo"
echo "4. Abre http://localhost:3000 en tu navegador"
echo ""
echo "📚 Para más información, consulta el README.md" 