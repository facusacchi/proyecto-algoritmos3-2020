import './App.css';
import { LoginComponent } from './login/login';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FooterComponent } from './footer/footer';
import { Header } from './header/header'
import { MenuHeader } from './menu-header/MenuHeader'

const App = () => (
    <div className="App">   
      <Header/>
      <MenuHeader/>
      <LoginComponent/> 
      <FooterComponent/>
    </div>
  )
  
  export default App;
  