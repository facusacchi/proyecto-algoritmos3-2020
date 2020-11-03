import logo from './logo.svg';
import './App.css';
import { LoginComponent } from './login/login';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FooterComponent } from './footer/footer';
 

function App() {
  return (
    <div className="App">
      
       <LoginComponent/> 
      
      <FooterComponent/>
    </div>
  );
}

export default App;
