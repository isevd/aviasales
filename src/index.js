import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store/store.js';
import App from './components/App/App';
import './index.css';
import 'typeface-open-sans';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
