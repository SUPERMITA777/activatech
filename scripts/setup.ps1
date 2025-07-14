# Script de configuración para ActivateCH Landing Page (Windows)
Write-Host "Configurando ActivateCH Landing Page..." -ForegroundColor Green

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "Node.js $nodeVersion detectado" -ForegroundColor Green
} catch {
    Write-Host "Node.js no está instalado. Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar versión de Node.js
$nodeMajorVersion = (node --version).Split('.')[0].TrimStart('v')
if ([int]$nodeMajorVersion -lt 18) {
    Write-Host "Node.js versión 18 o superior es requerida. Versión actual: $(node --version)" -ForegroundColor Red
    exit 1
}

# Verificar si pnpm está instalado
try {
    $pnpmVersion = pnpm --version
    Write-Host "pnpm $pnpmVersion detectado" -ForegroundColor Green
} catch {
    Write-Host "Instalando pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
pnpm install

# Crear archivo .env.local si no existe
if (-not (Test-Path ".env.local")) {
    Write-Host "Creando archivo .env.local..." -ForegroundColor Yellow
    $envContent = @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Instagram API (if needed)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here

# Optional: Currency API (if needed)
CURRENCY_API_KEY=your_currency_api_key_here
"@
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    
    Write-Host "Por favor configura las variables de entorno en .env.local" -ForegroundColor Yellow
}

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "Git detectado" -ForegroundColor Green
} catch {
    Write-Host "Git no está instalado. Por favor instala Git desde https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Inicializar Git si no está inicializado
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: ActivateCH Landing Page"
}

Write-Host ""
Write-Host "¡Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Configura las variables de entorno en .env.local" -ForegroundColor White
Write-Host "2. Crea un proyecto en Supabase y ejecuta los scripts SQL" -ForegroundColor White
Write-Host "3. Ejecuta 'pnpm dev' para iniciar el servidor de desarrollo" -ForegroundColor White
Write-Host "4. Abre http://localhost:3000 en tu navegador" -ForegroundColor White
Write-Host ""
Write-Host "Para más información, consulta el README.md" -ForegroundColor Cyan 