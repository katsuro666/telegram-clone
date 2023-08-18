import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { set } from 'features/themeSlice';
import styles from './Theme.module.scss';

export function Theme({ className }) {
  // @ts-ignore
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={cn(className, styles.root, theme === 'dark' ? styles.dark : styles.light)}/>
  );
}
