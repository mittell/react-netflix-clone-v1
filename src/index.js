import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import 'normalize.css';
import { GlobalStyles } from './global-styles';
import { fb } from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<>
		<FirebaseContext.Provider value={{ fb }}>
			<GlobalStyles />
			<App />
		</FirebaseContext.Provider>
	</>
);
