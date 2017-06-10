import component from './component';

const rootEl = document.getElementById('root');

rootEl.appendChild(component());


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
  rootEl.appendChild(component(`${feature} ${r(fn)}`));
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