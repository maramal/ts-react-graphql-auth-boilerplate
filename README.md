# Plantilla de Frontend para autenticación de usuarios con JWT

Este proyecto se complementa con el servidor Express [alojado en Github](https://github.com/maramal/ts-express-graphql-pg-auth-boilerplate).

El objetivo de este proyecto es proveer una base para cualquier sistema que requiera autenticación mediante token JWT.

El proyecto cuenta con las siguientes páginas:

| Acción | Ruta | Archivo | Descripción |
| ------ | ---- | ------- | ----------- |
| Confirmar usuario | `/confirmar/:token` | `src/app/confirm.tsx` | Confirma un usuario
| Contraseña olvidada | `/contraseña-olvidada` | `src/app/forgot_password.tsx` | Permite al usuario enviar un correo para cambiar su contraseña |
| Inicio | `/` | `src/app/home.tsx` | Página de inicio |
| Ingreso | `/ingreso` | `src/app/login.tsx` | Ingreso de usuario |
| Página no encontrada | `*` | `src/app/not-found.tsx` | Página alternativa a las rutas existentes |
| Perfil | `/perfil` | `src/profile.tsx` | Página de perfil de usuario |
| Registro | `/registro` | `src/register.tsx` | Permite al usuario registrar una cuenta nueva |
| Reenviar confirmación | `/reenviar-confirmacion` | `src/resend_confirm.tsx` | Permite al usuario enviar un nuevo enlace de confirmación de correo |
| Reiniciar contraseña | `/reiniciar-contraseña` | `src/reset_password.tsx` | Permite al usuario ingresar una nueva contraseña |

Los siguientes comandos pueden ser ejecutados desde la terminal (CLI):

* `npm start`: Comienza la aplicación en el puerto predeterminado (3000).
* `npm run build`: Construye todos los archivos para su deployment en producción.
* `npm run eject`: Construye todos los archivos para su deployment y posterior configuración. **Nota: Esta acción no se puede volver atrás**.
* `npm run gql`: Compila el código dentro de la carpeta `src/gql/*.graphql` generando los hooks que se pueden utilizar para GraphQL en el servidor y los genera en `src/gql/generated`.
