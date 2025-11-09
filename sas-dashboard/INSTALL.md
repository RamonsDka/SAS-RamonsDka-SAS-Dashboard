SAS Dashboard - RDKTECH
📊 Server Administration System Dashboard
Un dashboard completo para monitorizar tu servidor Ubuntu con CasaOS instalado. Incluye monitorización en tiempo real de CPU, RAM, temperatura, red, contenedores Docker, sistema de archivos, terminal integrado, calendario, notas, alarmas y más.

🚀 Características
✅ Monitorización en tiempo real de métricas del sistema (CPU, RAM, Temperatura, Red)
✅ Visualización de contenedores Docker y CasaOS
✅ Gráficos históricos de uso de recursos
✅ Terminal integrado
✅ Explorador de archivos
✅ Sistema de calendario y eventos
✅ Notas y alarmas
✅ Gestión de actualizaciones
✅ Modo oscuro funcional
✅ Diseño responsive (móvil, tablet, desktop)
✅ Animaciones y transiciones suaves
📋 Requisitos Previos
Docker y Docker Compose instalados
Ubuntu Server con CasaOS (opcional)
Puerto 7770 disponible
🔧 Instalación con Docker Compose (Recomendado)
1. Clonar o descargar el proyecto
git clone <tu-repositorio>

cd sas-dashboard
2. Construir e iniciar el contenedor
docker-compose up -d
3. Acceder al dashboard
Abre tu navegador y visita:

Local: http://localhost:7770
Dominio: http://sas.rdktech.us (si tienes configurado tu DNS)
🛠️ Instalación Manual
1. Instalar dependencias
# Instalar Bun (si no lo tienes)

curl -fsSL https://bun.sh/install | bash


# Instalar dependencias del proyecto

bun install
2. Ejecutar en modo desarrollo
bun run dev
3. Compilar para producción
bun run build

bun run start
🌐 Configuración de DNS
Para acceder al dashboard usando el dominio sas.rdktech.us:

1. En tu router/firewall:
Configura port forwarding del puerto 7770 a tu servidor
2. En tu proveedor de DNS:
Crea un registro A apuntando sas.rdktech.us a tu IP pública
O configura un DNS local si solo necesitas acceso interno
3. Reverse Proxy (Opcional):
Si usas Nginx o Traefik como reverse proxy:

Nginx:

server {

    listen 80;

    server_name sas.rdktech.us;


    location / {

        proxy_pass http://localhost:7770;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;

    }

}
Traefik: El archivo docker-compose.yml ya incluye las etiquetas necesarias para Traefik.

🔄 Actualización
# Detener el contenedor

docker-compose down


# Obtener últimos cambios

git pull


# Reconstruir y reiniciar

docker-compose up -d --build
🎨 Personalización
Cambiar el tema por defecto
Edita src/app/layout.tsx y cambia defaultTheme:

<ThemeProvider defaultTheme="dark"> // o "light"
Modificar métricas y datos
Los componentes están en src/components/ - puedes modificar cualquier componente para conectar con APIs reales de tu sistema.

Conectar con datos reales
Para obtener datos reales del sistema, necesitarás crear endpoints API que consulten:

/proc/stat - CPU usage
/proc/meminfo - RAM usage
/sys/class/thermal/ - Temperature
Docker Socket API - Containers info
Filesystem APIs - Disk usage
📱 Uso
Navegación
Home: Dashboard principal con todas las métricas
Explore: Exploración avanzada (próximamente)
Calendar: Calendario y eventos
Community: Comunidad (próximamente)
Servers: Gestión de servidores
Monitor: Monitorización detallada
Características Principales
Cambiar tema: Click en el icono de sol/luna en el sidebar
Subir foto de perfil: Click en el avatar en el header
Terminal: Escribe comandos en el terminal integrado
Crear eventos: Click en "Create Event" en el calendario
Añadir notas: Click en "Add Note"
Gestionar alarmas: Click en "Create Alarm"
🐛 Solución de Problemas
El contenedor no inicia
# Ver logs

docker-compose logs -f


# Verificar que el puerto 7770 no esté en uso

sudo lsof -i :7770
No puedo acceder al dashboard
Verifica que el contenedor esté corriendo: docker ps
Verifica el firewall: sudo ufw status
Verifica que el puerto esté abierto: sudo netstat -tulpn | grep 7770
Error de permisos con Docker Socket
sudo chmod 666 /var/run/docker.sock
📝 Notas de Desarrollo
Este dashboard usa:

Next.js 15 - Framework React
TypeScript - Tipado estático
Tailwind CSS - Estilos
shadcn/ui - Componentes UI
Recharts - Gráficos
Lucide React - Iconos
🤝 Contribuir
Las contribuciones son bienvenidas. Por favor:

Fork el proyecto
Crea una rama para tu feature
Commit tus cambios
Push a la rama
Abre un Pull Request
📄 Licencia
Este proyecto es de código abierto y está disponible bajo la licencia MIT.

🆘 Soporte
Para soporte, por favor abre un issue en el repositorio del proyecto.

Desarrollado con ❤️ por RDKTECH
