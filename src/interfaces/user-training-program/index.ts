import { UserInterface } from 'interfaces/user';
import { TrainingProgramInterface } from 'interfaces/training-program';
import { GetQueryInterface } from 'interfaces';

export interface UserTrainingProgramInterface {
  id?: string;
  user_id: string;
  training_program_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  training_program?: TrainingProgramInterface;
  _count?: {};
}

export interface UserTrainingProgramGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  training_program_id?: string;
  status?: string;
}
