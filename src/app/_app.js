'use client'

const { GlobalContextProvider } = require("./globalContext")

function MyApp({ Component, pageProps }) {
    return (
      // Wrap the app with GlobalContextProvider
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    );
  }
  
  export default MyApp;