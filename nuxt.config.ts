// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    ['@nuxtjs/google-fonts', {
      families: {
        Roboto: true,
        'Roboto Mono': true,
        'Josefin+Sans': true,
        Lato: [100, 300],
        Raleway: {
          wght: [100, 400],
          ital: [100]
        },
        Inter: '200..700',
        'Crimson Pro': {
          wght: '200..900',
          ital: '200..700',
        }
      }
    }],
  ],
  css: ['~/assets/css/new.css'],
  googleFonts: {
    download: true
  },
  typescript: {
    typeCheck: true
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.API_BASE_URL || "http://localhost:30101",
          changeOrigin: true,
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:30101",
      siteBase: "http://localhost:3000"
    }
  },
  app: {
    head: {
      title: 'cassidy\'s home page',
      htmlAttrs: {
        lang: 'en',
      }
    }
  },
})
