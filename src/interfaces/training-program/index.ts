import { UserTrainingProgramInterface } from 'interfaces/user-training-program';
import { FireDepartmentInterface } from 'interfaces/fire-department';
import { GetQueryInterface } from 'interfaces';

export interface TrainingProgramInterface {
  id?: string;
  name: string;
  description?: string;
  fire_department_id: string;
  created_at?: any;
  updated_at?: any;
  user_training_program?: UserTrainingProgramInterface[];
  fire_department?: FireDepartmentInterface;
  _count?: {
    user_training_program?: number;
  };
}

export interface TrainingProgramGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  fire_department_id?: string;
}
