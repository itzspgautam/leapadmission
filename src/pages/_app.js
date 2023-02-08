import { Layout } from "@/Components";
import { store } from "@/State/store";
import theme from "@/Themes";

// import "@fontsource/poppins";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
