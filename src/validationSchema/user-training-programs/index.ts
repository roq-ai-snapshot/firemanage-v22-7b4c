import * as yup from 'yup';

export const userTrainingProgramValidationSchema = yup.object().shape({
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  training_program_id: yup.string().nullable().required(),
});
