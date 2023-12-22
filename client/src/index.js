import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {AppContextProvider} from './contexts/AppContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
	<StrictMode>
		<AppContextProvider>
			<ColorModeScript />
			<App />
		</AppContextProvider>
	</StrictMode>
);
