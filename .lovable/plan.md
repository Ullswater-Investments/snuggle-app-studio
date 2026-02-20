
## Internacionalizar el Centro de Notificaciones y el Badge del Topbar

### Resumen

Conectar todos los textos hardcodeados en `Notifications.tsx` y `NotificationsBell.tsx` al sistema i18n usando `t('notifications.xxx')`, y actualizar los 7 archivos de traduccion (ES, EN, FR, DE, IT, PT, NL) con las claves necesarias.

### 1. Actualizar archivos de traduccion (7 archivos)

Se actualizaran los archivos `src/locales/{lang}/notifications.json` anadiendo las claves que faltan y ajustando las existentes para cubrir todos los textos del componente:

| Clave | ES | EN | FR | DE | IT | PT | NL |
|-------|----|----|----|----|----|----|-----|
| `title` | Centro de Notificaciones | Notification Center | Centre de Notifications | Benachrichtigungszentrum | Centro Notifiche | Centro de Notificacoes | Meldingscentrum |
| `subtitle` | Gestiona tus alertas y actividad reciente | Manage your alerts and recent activity | Gerez vos alertes et votre activite recente | Verwalten Sie Ihre Benachrichtigungen und Aktivitaten | Gestisci le tue notifiche e attivita recente | Gerencie seus alertas e atividade recente | Beheer uw meldingen en recente activiteit |
| `card.title` | Actividad Reciente | Recent Activity | Activite Recente | Neueste Aktivitat | Attivita Recente | Atividade Recente | Recente Activiteit |
| `card.description` | Historial de eventos, transacciones y acciones pendientes | Event history, transactions and pending actions | Historique, transactions et actions en attente | Verlauf, Transaktionen und ausstehende Aktionen | Cronologia eventi, transazioni e azioni in sospeso | Historico de eventos, transacoes e acoes pendentes | Gebeurtenissen, transacties en openstaande acties |
| `actions.markAsUnread` | Marcar como no leida | Mark as unread | Marquer comme non lue | Als ungelesen markieren | Segna come non letta | Marcar como nao lida | Als ongelezen markeren |
| `actions.markAllRead` | Marcar todo como leido | Mark all as read | Tout marquer comme lu | Alle als gelesen markieren | Segna tutto come letto | Marcar tudo como lido | Alles als gelezen markeren |
| `bell.title` | Notificaciones | Notifications | Notifications | Benachrichtigungen | Notifiche | Notificacoes | Meldingen |
| `bell.new` | nuevas | new | nouvelles | neue | nuove | novas | nieuw |
| `bell.markRead` | Marcar leidas | Mark read | Marquer lues | Als gelesen | Segna lette | Marcar lidas | Gelezen |
| `bell.empty` | No tienes notificaciones | No notifications | Aucune notification | Keine Benachrichtigungen | Nessuna notifica | Sem notificacoes | Geen meldingen |
| `toast.deleted` | Notificacion eliminada | Notification deleted | Notification supprimee | Benachrichtigung geloscht | Notifica eliminata | Notificacao excluida | Melding verwijderd |
| `toast.deleteError` | Error al eliminar la notificacion | Error deleting notification | Erreur de suppression | Fehler beim Loschen | Errore durante l'eliminazione | Erro ao excluir | Fout bij verwijderen |
| `toast.error` | Error | Error | Erreur | Fehler | Errore | Erro | Fout |

### 2. Modificar `src/pages/Notifications.tsx`

Reactivar el hook `useTranslation('notifications')` y reemplazar las ~20 cadenas hardcodeadas:

- Linea 69: `const { i18n }` -> `const { t, i18n }`
- Linea 126: `"Nueva notificacion"` -> `t("toast.newNotification")`
- Linea 167: `"Notificacion eliminada"` -> `t("toast.deleted")`
- Linea 169: `"Error al eliminar..."` -> `t("toast.deleteError")`
- Linea 190: `"Todas las notificaciones..."` -> `t("toast.allMarkedAsRead")`
- Linea 193: `"Error"` -> `t("toast.error")`
- Linea 283: `"Hoy"` -> `t("groups.today")`
- Linea 284: `"Ayer"` -> `t("groups.yesterday")`
- Linea 285: `"Anteriores"` -> `t("groups.older")`
- Linea 319: `"Centro de Notificaciones"` -> `t("title")`
- Linea 322: `"Gestiona tus alertas..."` -> `t("subtitle")`
- Linea 336: `"Todas"` -> `t("filters.all")`
- Linea 343: `"No leidas"` -> `t("filters.unread")`
- Linea 357: `"Prioridad Alta"` -> `t("filters.highPriority")`
- Linea 375: `"Marcar todo como leido"` -> `t("actions.markAllRead")`
- Linea 384: `"Actividad Reciente"` -> `t("card.title")`
- Linea 386: `"Historial de eventos..."` -> `t("card.description")`
- Linea 399: `"Sin notificaciones"` -> `t("empty.title")`
- Linea 401: `"Te avisaremos..."` -> `t("empty.description")`
- Linea 467: `"Ver detalles"` -> `t("actions.viewDetails")`
- Linea 490: `"Marcar como no leida"` -> `t("actions.markAsUnread")`
- Linea 495: `"Marcar como leida"` -> `t("actions.markAsRead")`
- Linea 504: `"Ver detalles"` -> `t("actions.viewDetails")`
- Linea 512: `"Eliminar"` -> `t("actions.delete")`

### 3. Modificar `src/components/NotificationsBell.tsx`

Anadir `useTranslation('notifications')` y reemplazar las cadenas hardcodeadas del popover:

- `"Notificaciones"` -> `t("bell.title")`
- `"nuevas"` -> `t("bell.new")`
- `"Marcar leidas"` -> `t("bell.markRead")`
- `"No tienes notificaciones"` -> `t("bell.empty")`
- `"Todas las notificaciones marcadas..."` -> `t("toast.allMarkedAsRead")`
- Localizar `toLocaleTimeString` usando el idioma activo en vez de `'es-ES'` hardcodeado

### Archivos a modificar (9 total)

1. `src/locales/es/notifications.json`
2. `src/locales/en/notifications.json`
3. `src/locales/fr/notifications.json`
4. `src/locales/de/notifications.json`
5. `src/locales/it/notifications.json`
6. `src/locales/pt/notifications.json`
7. `src/locales/nl/notifications.json`
8. `src/pages/Notifications.tsx`
9. `src/components/NotificationsBell.tsx`
