# Mapa de Autoobservación Intestinal

Aplicación web creada con **React + Vite + TailwindCSS** para realizar una evaluación interactiva por bloques de salud intestinal.

## Características

- Test interactivo por bloques (6 bloques).
- 36 preguntas totales.
- Puntaje total sobre 108.
- Puntaje por bloque.
- Barra de progreso.
- Validación para no avanzar sin responder.
- Resultados interpretativos.
- Recomendaciones iniciales.
- Sección de señales de alarma.
- Fecha de evaluación.
- Opción de repetir evaluación.
- Botón para imprimir o guardar como PDF.
- CTA principal hacia: https://www.mentorontologico.com/

## Ejecutar localmente

### 1) Instalar dependencias

```bash
npm install
```

### 2) Levantar entorno de desarrollo

```bash
npm run dev
```

Abrir en navegador la URL indicada por Vite (por defecto `http://localhost:5173`).

### 3) Build de producción

```bash
npm run build
```

### 4) Previsualizar build

```bash
npm run preview
```

## Despliegue en Vercel

1. Sube este repositorio a GitHub.
2. Entra a [Vercel](https://vercel.com/) y crea un nuevo proyecto.
3. Importa el repositorio `laboratoriodelamente-droid/mapa-autoobservacion-intestinal`.
4. Vercel detectará automáticamente Vite.
5. Verifica configuración:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Haz clic en **Deploy**.

## Stack

- React 18
- Vite 5
- TailwindCSS 3
