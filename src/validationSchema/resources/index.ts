import * as yup from 'yup';

export const resourceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  status: yup.string().required(),
  fire_department_id: yup.string().nullable().required(),
});
