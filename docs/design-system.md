# CostoSmart · Mobile Design System Sync

Resumen rápido de los cimientos visuales extraídos del front web (`costoSmartFront/src/theme.js`) para sincronizar la app móvil.

## Paleta

| Token | Hex | Uso |
| --- | --- | --- |
| `brand.primary.main` | `#0f172a` | Fondos sólidos de headers, texto principal |
| `brand.primary.light` | `#1e293b` | Variantes/hover, fondos oscuros secundarios |
| `brand.primary.dark` | `#020617` | Status bar / degradados profundos |
| `brand.secondary.main` | `#7c3aed` | Acciones destacadas, chips |
| `accent.blue` | `#0ea5e9` | Información/links, highlights |
| `success` | `#16a34a` | KPIs positivos, badges |
| `warning` | `#f97316` | Alertas suaves, etiquetas |
| `danger` | `#dc2626` | Errores |
| `text.primary` | `#0f172a` | Texto primario |
| `text.secondary` | `#475569` | Texto secundario |
| `text.muted` | `#64748b` | Etiquetas/placeholder |
| `background` | `#f1f5f9` | Fondo de app |
| `surface` | `#ffffff` | Tarjetas |
| `surfaceMuted` | `#f8fafc` | Secciones/inputs |
| `divider` | `rgba(15,23,42,0.12)` | Divisores/sombras |

## Tipografías

- Base: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`
- Display: `"Montserrat"` para logos/títulos hero
- Escalas sugeridas para RN (px): `display=34`, `h1=28`, `h2=24`, `h3=20`, `body=16`, `caption=13`

## Forma y sombras

- Radios: `12px` en inputs/botones, `16px` en cards.
- Elevación: sombra suave `rgba(15,23,42,0.08)` con desplazamiento 12/30px (desktop). En RN trasladamos a `shadowOpacity 0.08`, `shadowRadius 12`, `elevation 6`.

## Componentes clave

- Buttons con `borderRadius:12`, padding horizontal amplio, sin `textTransform`.
- Cards con borde `1px solid rgba(148,163,184,0.25)` y hover/press con alzada adicional.
- Chips/ListItem con márgenes `4x8` y radios de `12`.
- Fondos con degradado `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)` para héroes/login.

Estos tokens alimentan la refactorización del sistema RN (`src/theme/tokens.js`, `paperTheme.js`, estilos base y componentes reutilizables).
