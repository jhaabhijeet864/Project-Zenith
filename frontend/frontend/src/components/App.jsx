import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
};

export default App;