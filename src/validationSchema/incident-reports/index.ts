import * as yup from 'yup';

export const incidentReportValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  status: yup.string().required(),
  fire_department_id: yup.string().nullable().required(),
});
