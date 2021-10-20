import Page from './components/Page';
import LandingPage from './components/screens/LandingPage/LandingPage'
import LoginScreen from './components/screens/LoginScreen/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen'
import Header from './components/Header';

import {BrowserRouter, Route} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
        <Header />
        <main>
            <Route path="/" component={LandingPage} exact />

            <Route path="/login" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} exact />

            <Route path="/myweather" component={() => <Page />}/>
        </main>
        
        </BrowserRouter>
    );
}

export default App;
