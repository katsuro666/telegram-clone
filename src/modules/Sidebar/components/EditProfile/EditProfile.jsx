import React, { useState, useEffect } from 'react';
import { IconButton, TextField } from '@mui/material';
import './EditProfile.scss';
import { selectUser, setNewFields } from 'features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../.././../firebase';
import { useFormik } from 'formik';
import { userSettingsSchema } from 'app/validations/userSettings';
import DoneIcon from '@mui/icons-material/Done';
import { setIsEditProfileOpen, setIsSettingsOpen } from 'features/navSlice';

export function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [usersList, setUsersList] = useState([]);

  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isUsernameFree, setIsUsernameFree] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection('users').orderBy('displayName').get();
      setUsersList(data.docs.map((doc) => doc.data().username));
    };
    fetchData();
  }, []);

  const { values, errors, setFieldValue } = useFormik({
    initialValues: {
      displayName: user.displayName,
      username: user.username,
    },
    validationSchema: userSettingsSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleUserDisplayNameChange = (value) => {
    setFieldValue('displayName', value, true);
  };

  const handleUsernameChange = (value) => {
    setFieldValue('username', value, true);

    if (value === user.username) {
      setIsUsernameTaken(false);
      setIsUsernameFree(false);
    } else if (usersList.includes(value)) {
      setIsUsernameTaken(true);
      setIsUsernameFree(false);
    } else {
      setIsUsernameFree(true);
      setIsUsernameTaken(false);
    }
  };

  const changeUserSettings = () => {
    db.collection('users').doc(user.uid).update({
      displayName: values.displayName,
      username: values.username,
    })
    dispatch(setNewFields(values));
    dispatch(setIsEditProfileOpen(false));
    dispatch(setIsSettingsOpen(true));
  };

  return (
    <div>
      <div className='edit-profile__fields'>
        <TextField
          className='edit-profile__textfield'
          label='Name'
          variant='outlined'
          size='small'
          autoComplete='off'
          value={values.displayName}
          onChange={(e) => handleUserDisplayNameChange(e.target.value)}
        />
        <TextField
          className='edit-profile__textfield'
          label='Username'
          variant='outlined'
          size='small'
          autoComplete='off'
          value={values.username}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />

        {isUsernameTaken && !errors.username && (
          <span className='edit-profile__info--error'>Username is already taken</span>
        )}
        {isUsernameFree && !errors.username && (
          <span className='edit-profile__info--success'>Username is available</span>
        )}

        {errors.username && <span className='edit-profile__info--error'>{`${errors.username}`}</span>}

        <span className='edit-profile__info'>
          You can choose a username on <b>Telegram</b>. If you do, people will be able to find you by this username.
          <br />
          <br />
          You can use <b>a-z</b>, <b>0-9</b> and underscores. Minimum length is <b>5</b> characters.
        </span>

        {((isUsernameFree && !errors.username) ||
          (values.username === user.username && values.displayName !== user.displayName)) && (
          <IconButton className='settings__accept-btn' onClick={changeUserSettings}>
            <DoneIcon className='settings__accept-icon' />
          </IconButton>
        )}
      </div>
    </div>
  );
}
