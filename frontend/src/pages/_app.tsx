import { wrapper } from '@/store/store'
import '@/styles/mains.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
