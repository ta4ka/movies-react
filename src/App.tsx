import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Firebase, { FirebaseContext } from './infra/firebase';
import IndexPage from './routes/IndexPage';
import CommentPage from './routes/CommentPage';

const App: React.FC = () => {
  return (
    <FirebaseContext.Provider
      value={{
        fire: Firebase()
      }}
    >
      <BrowserRouter>
        <div className='App'>
          <header className='App-header'>
            <Link to='/'>Home</Link>
          </header>
          <div style={{ padding: 50 }}>
            <Route path='/' exact component={IndexPage} />
            <Route path='/comment/:id' component={CommentPage} />
          </div>
        </div>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
};

export default App;
