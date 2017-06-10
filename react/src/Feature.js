import join from 'lodash/join';
import styles from './Feature.css';
import React from 'react';

export default (props) => {
  return <div className={styles.comp}>{join(['feature',props.name, props.status], ' ')}</div>;
};