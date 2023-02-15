import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  margin: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#f8f8f8',
  color: '#fff',
});
