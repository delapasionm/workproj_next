import '../styles/globals.css'
import Login from './Login';
import SignUp from './SignUp';
import { NextComponentType, NextPageContext } from 'next';

type AppProps = {
  pageProps: any
  Component: NextComponentType<NextPageContext, any, {}> & { layoutProps: any }
}

function MyApp({ Component, pageProps }: AppProps) {
  
  const Layout = Component.layoutProps?.Layout || EmptyLayout;

  return (
    <div className='container'>
      <Component {...pageProps} />
    </div>
  );
}

const EmptyLayout = ({children}: any) => <>{children}</>
export default MyApp
