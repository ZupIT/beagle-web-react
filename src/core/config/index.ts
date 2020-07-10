export const env = process.env.APP_ENV

export const environments = {
  mock: {
    url: 'http://localhost:3001',
  },
  production: {
    url: 'http://localhost:3001',
  },
}
// @ts-ignore
export const getCurrentEnvConfig = () => environments[env] || environments.production
