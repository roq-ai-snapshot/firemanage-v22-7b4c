import * as yup from 'yup';

export const emergencyResponsePlanValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  fire_department_id: yup.string().nullable().required(),
});
