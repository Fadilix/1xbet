import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import useRouter from './routes/Routes';

const App = () => {
  const Router = useRouter();

  return (
    <div>
      <Toaster position="top-right" />
      <div className="routes">
        {Router}
      </div>
    </div>
  );
}

export default App;
