import * as yup from 'yup';
import { emergencyResponsePlanValidationSchema } from 'validationSchema/emergency-response-plans';
import { incidentReportValidationSchema } from 'validationSchema/incident-reports';
import { resourceValidationSchema } from 'validationSchema/resources';
import { trainingProgramValidationSchema } from 'validationSchema/training-programs';

export const fireDepartmentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  emergency_response_plan: yup.array().of(emergencyResponsePlanValidationSchema),
  incident_report: yup.array().of(incidentReportValidationSchema),
  resource: yup.array().of(resourceValidationSchema),
  training_program: yup.array().of(trainingProgramValidationSchema),
});
