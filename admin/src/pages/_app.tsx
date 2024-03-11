import { ModalProvider } from "@/context/modalContext";
import { makeStore } from "@/store/store";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function App({ Component, ...rest }: AppPropsWithLayout) {

  const store = makeStore();

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ModalProvider>
          {getLayout(
            <Component {...rest} />
          )}
        </ModalProvider>
      </Provider>
    </ThemeProvider>
  );
}
