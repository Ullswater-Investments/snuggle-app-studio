# PROCUREDATA - Sistema de Gobernanza de Datos

## 🎭 MODO DEMOSTRACIÓN DISPONIBLE

**¡Prueba PROCUREDATA sin configuración!**

1. Ve a la página de login (`/auth`)
2. Haz clic en **🎭 Acceder a Versión Demo**
3. Explora el sistema con 6 organizaciones en los 3 roles (Consumer, Holder, Provider)

**Credenciales**: `demo@procuredata.app` / `demo123456`

📖 **Documentación completa**: [DEMO_MODE.md](./DEMO_MODE.md)

---

## 🎯 FASE 5: INTEGRACIONES EXTERNAS ✅ COMPLETADA

Sistema de gobernanza de datos para la gestión de transacciones de datos entre organizaciones (Consumer, Provider, Data Holder) con control de acceso basado en roles y políticas de seguridad multi-tenant.

### ✅ Fases Completadas
- **Fase 1 - Fundación**: Base de datos, autenticación, roles y routing
- **Fase 2 - Catálogo**: Exploración de productos de datos con búsqueda avanzada
- **Fase 3 - Gobernanza**: Wizard de solicitud, aprobaciones multi-actor y políticas ODRL
- **Fase 4 - Visualización**: Vista de datos, exportación CSV y configuración de ERP
- **Fase 5 - Integraciones**: Edge Functions para ERP y notificaciones por email

**Ver documentación completa**: [ARCHITECTURE.md](./ARCHITECTURE.md)

### 🚀 Edge Functions Implementadas
- `erp-api-tester`: Test de conexión a APIs ERP externas
- `erp-data-uploader`: Envío real de datos a sistemas ERP
- `notification-handler`: Notificaciones automáticas por email (Resend)

## Project info

## How can I edit this code?

There are several ways of editing your application.

**Use the Platform**

Simply visit the Project and start prompting.

Changes made will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the platform.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open the platform and click on Share -> Publish.

## Can I connect a custom domain to my project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
