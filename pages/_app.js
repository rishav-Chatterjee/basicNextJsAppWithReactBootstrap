import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
//import "bootstrap/dist/js/bootstrap";
import Layout from '../components/Layout';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
