import '@/sass/index.scss'
import { ThemeProvider } from '@emotion/react'
import theme from '@/styles/theme'
import MainLayout from '@/layouts/MainLayout'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  )
}

export default MyApp
