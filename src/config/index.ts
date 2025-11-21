// src/config/index.ts
interface AppConfig {
  api: {
    baseUrl: string
    endpoints: {
      eventByUrl: string
      // ...
    }
  }
  app: {
    name: string
    version: string
  }
}

export const config: AppConfig = {
  api: {
    baseUrl: 'https://forecast-server-jp.najib-saab.workers.dev',
    endpoints: {
      eventByUrl: '/events/by-url',
    }
  },
  app: {
    name: '1xJet Vote',
    version: '1.0.0'
  }
}