import env from 'env-var'

export const CONFIG = {
  PORT: env.get('PORT').default(3000).asPortNumber(),
  BACKENDFF_URL: env.get('BACKENDFF_URL').required().asString(),
}

console.log(
  '✅ Todas las variables de entorno están correctamente configuradas.'
)
