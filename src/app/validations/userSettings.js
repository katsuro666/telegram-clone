import * as yup from 'yup';

export const userSettingsSchema = yup.object().shape({
  displayName: yup.string().required('Required'),
  username: yup
    .string()
    .min(5, 'The minimum length is 5 characters.')
    .matches(/^([a-z0-9_]+)$/, 'Lowercase letters, numbers and underscores only.')
    .required('Required'),
});
