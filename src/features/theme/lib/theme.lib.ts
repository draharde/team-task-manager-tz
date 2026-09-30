import { STORAGE_KEYS } from '@/shared/config';
import { THEME_ATTRIBUTE } from '../config/theme.constants';

export const THEME_INIT_SCRIPT = `(function(){
  try {
    const theme = JSON.parse(localStorage.getItem('${STORAGE_KEYS.theme}'))?.state?.theme;
    if (theme === 'dark') document.documentElement.setAttribute('${THEME_ATTRIBUTE}', 'dark');
  } catch (error) {
    console.warn('THEME_ERROR', error);
  }
})();`;
