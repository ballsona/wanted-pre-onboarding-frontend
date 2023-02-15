import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const authbox = style({
  width: 500,
  height: 400,
  backgroundColor: '#ebe4f9',
  borderRadius: 20,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  color: '#888',
  fontSize: 28,
  fontWeight: 600,
  marginBottom: 30,
});

export const input = style({
  width: 300,
  height: 40,
  border: 0,
  borderRadius: 5,
  backgroundColor: '#f8f8f8',
  margin: 10,
  padding: '0px 10px',
  fontSize: 15,

  ':focus': {
    outline: 'none',
  },
});

export const button = style({
  width: 150,
  height: 35,
  marginTop: 20,
  border: 0,
  borderRadius: 5,
  backgroundColor: '#9563fb',
  color: '#fff',
  fontSize: 15,
});
