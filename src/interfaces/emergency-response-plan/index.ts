import { FireDepartmentInterface } from 'interfaces/fire-department';
import { GetQueryInterface } from 'interfaces';

export interface EmergencyResponsePlanInterface {
  id?: string;
  name: string;
  description?: string;
  fire_department_id: string;
  created_at?: any;
  updated_at?: any;

  fire_department?: FireDepartmentInterface;
  _count?: {};
}

export interface EmergencyResponsePlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  fire_department_id?: string;
}
