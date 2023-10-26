import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import DogDetails from './containers/DogDetails/DogDetails';
import Navbar from './components/layout/Navbar';
import DogForm from './components/DogForm/DogForm';

import './App.css';  // Estilos de la App.

// Este es tu componente principal de la aplicación.
function App() {
  return (
    // Envuelves todo en un Router. Esto permite que uses el enrutamiento en cualquier parte de tu aplicación.
    <Router>
      <AppContent /> 
    </Router>
  );
}

// Este componente representa el contenido principal de mi aplicación.
function AppContent() {
  const location = useLocation();  //  da acceso a la ubicación actual (es decir, la URL) de la aplicación.

  return (
    <div className="App">
      {/* Si la URL no es '/', muestra el Navbar. */}
      {location.pathname !== '/' && <Navbar />}
      
      {/* Switch se asegura de que solo se renderice una de las rutas a continuación. */}
      <Switch>
        <Route exact path="/create-dog" component={DogForm} />  // muestra el formulario para crear un perro.
        <Route exact path="/dog/:id" component={DogDetails} />  // muestra los detalles de ese perro.
        <Route exact path="/home" component={Home} />  // muestra la página principal.
        <Route exact path="/" component={Landing} />  //  muestra la página de inicio (Landing).
      </Switch>
    </div>
  );
}

export default App;  
