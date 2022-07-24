import { lazy, Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import { GameProvider } from '../contexts/game/game.context';

import './App.scss';

const App = () => {   

  const HomePage = lazy(() => import('../pages/home/home.page'))
  const GamePage = lazy(() => import('../pages/game/game.page'))
  const RegisterPage = lazy(() => import('../pages/register/register.page'))
  
  return (
    <div className='app'>
      <Suspense fallback={<span>Loading...</span>}>
        <Routes>        
          <Route exact path='/' element={<HomePage />} />                           
          <Route exact path='/game' element={<GameProvider><GamePage /></GameProvider>} />      
          <Route exact path='/register' element={<RegisterPage />} />      
          <Route exact path='*' element={<span>Page not found</span>} />           
        </Routes>
      </Suspense>
    </div>
  );
}
 
export default App;
