import join from 'lodash/join';
import styles from './component.css';

export default (text = 'import') => {
  const element = document.createElement('div');
  element.className = styles.comp;

  element.innerHTML =  join(['feature',text], ' ');

  return element;

};