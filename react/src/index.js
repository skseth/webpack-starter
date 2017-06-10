import React from 'react';
import ReactDOM from 'react-dom';
import Feature from './Feature';

const features = [];

function r(fn) {
  try {
    if (fn()) {
      return 'success';
    }
    else {
      return 'failure';
    }

  }
  catch(err) {
    return `error ${err}`;
  }	
}

function t(feature, fn) {
  features.push(<Feature key={feature} name={feature} status={r(fn)}/>);
}

t('object getter', () => {
  const obj = { get x()  {return 'x';} };
  return obj.x === 'x';
});

t('object setter', () => {
  var value = 'no setter accessor';
  const obj = { set x(v) {value = v;} };
  obj.x = 'x';
  return value === 'x';
});

t('object spread', () => {
  const obj = { a: 'object', b:'to be replaced'};
  const f = {...obj, ...{b: 'spread'}};
  return f.a === 'object' && f.b === 'spread';
});

t('generators', () => {
  function* a() {
    yield 'generators';
  }

  return a().next().value === 'generators';
});

ReactDOM.render(
  <div>{features}</div>,
  document.getElementById('root')
);
