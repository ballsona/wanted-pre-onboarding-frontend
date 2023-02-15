import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  color: '#000',
});

export const todobox = style({
  width: 500,
  height: 600,
  backgroundColor: '#ebe4f9',
  borderRadius: 20,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 70,
});

export const title = style({
  color: '#888',
  fontSize: 28,
  fontWeight: 600,
  marginBottom: 30,
});

export const todoform = style({
  display: 'flex',
});

export const todoinput = style({
  border: 'none',
  width: 250,
  height: 30,
  borderRadius: 5,
  padding: 10,
  ':focus': {
    outline: 'none',
  },
});

export const newTodoAddButton = style({
  border: 'none',
  background: 'transparent',
  fontSize: 13,
  color: '#777',
});

export const todolist = style({
  margin: 0,
  marginTop: 25,
  padding: 0,
  listStyle: 'none',
  width: 300,
});

export const todoitem = style({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '5px 0px',
});

export const itemButtonsWrap = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const itemButton = style({
  background: 'transparent',
  border: 'none',
  color: '#777',
});

export const modifyInput = style({
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid #777',
  width: 180,
  height: 25,
  marginLeft: 20,
});
