import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FooterComponent } from './footer/footer';
import { MensajesRoutes } from './route.js'
import 'primeflex/primeflex.css'
import { Provider } from './context/context'

const App = () => (
    <Provider>
      <MensajesRoutes />
      <FooterComponent/>
    </Provider>
  )

  export default App