import React from 'react';
import { render } from 'react-dom';
import App from './app.js'
import Console from './console.js'

render(<div>
  <App />
  <Console />
</div>, document.getElementById('app'))
