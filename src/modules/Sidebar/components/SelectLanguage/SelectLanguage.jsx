import React from 'react';
import { FormControlLabel, List, ListItem, ListItemButton, ListItemText, Radio, RadioGroup } from '@mui/material';
import './SelectLanguage.scss';
import { useLocalStorage } from 'app/hooks/useLocalStorage';
import i18n from '../../../../i18n';

export function SelectLanguage() {
  const [language, setLanguage] = useLocalStorage('language', 'ru');

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setLanguage(event.target.value);
  };

  return (
    <div>
      <List>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={language}
          onChange={handleLanguageChange}>
          <ListItem disablePadding>
            <ListItemButton className='language__item'>
              <FormControlLabel
                value='en'
                control={<Radio className={language === 'en' ? 'language__radio--selected' : 'language__radio'} />}
                label={<ListItemText primary='English' secondary='English' className='language__radio-text' />}
                className='language__radio-label'
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton className='language__item'>
              <FormControlLabel
                value='ru'
                control={<Radio className={language === 'ru' ? 'language__radio--selected' : 'language__radio'} />}
                label={<ListItemText primary='Russian' secondary='Русский' className='language__radio-text' />}
                className='language__radio-label'
              />
            </ListItemButton>
          </ListItem>
        </RadioGroup>
      </List>
    </div>
  );
}
