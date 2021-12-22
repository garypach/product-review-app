import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "../Components/Provider/Provider";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;
