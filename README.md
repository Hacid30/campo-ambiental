# Campo Ambiental · PWA

App de recolección de datos de campo para concesiones de aguas (CDMB).
Funciona 100 % sin internet una vez instalada.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La app completa (HTML + CSS + JS en un solo archivo) |
| `sw.js` | Service worker: guarda la app en caché para abrirla sin internet |
| `manifest.webmanifest` | Nombre, ícono y colores de la app instalada |
| `icon-192.png`, `icon-512.png` | Íconos para Android / manifest |
| `apple-touch-icon.png` | Ícono para iPhone |

## Publicar en GitHub Pages

1. Crea un repositorio público (p. ej. `campo-ambiental`).
2. Sube **todos** los archivos de esta carpeta a la raíz del repo.
3. En el repo: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. En 1–2 minutos la app queda en `https://TU-USUARIO.github.io/campo-ambiental/`.

## Instalar en el iPhone

1. Abre la URL en **Safari** (requiere internet solo esta primera vez).
2. Toca el botón **Compartir** (cuadro con flecha) → **Añadir a pantalla de inicio**.
3. Abre la app desde el ícono. Desde ahí funciona sin señal: registros, GPS y exportación.

En Android es igual: Chrome → menú ⋮ → "Añadir a pantalla de inicio" / "Instalar app".

## Actualizar la app

1. Edita `index.html` y súbelo al repo.
2. En `sw.js`, sube el número de `CACHE_NAME` (`campo-ambiental-v2`, `v3`, ...) y súbelo también.
3. Los teléfonos descargan la nueva versión la próxima vez que abran la app **con internet**
   (a veces hace falta cerrarla y abrirla dos veces).

Los registros guardados **no se borran** al actualizar: viven en el almacenamiento
del teléfono, no en la caché.

## Pasar registros entre teléfonos

Pestaña **Exportar** → "Descargar todos los registros" (genera un JSON) →
enviarlo por WhatsApp/correo → en el otro teléfono, pestaña **Exportar** →
"Cargar respaldo JSON". Los registros se combinan y gana el más reciente.
