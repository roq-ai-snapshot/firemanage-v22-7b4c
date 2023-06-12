import { EmergencyResponsePlanInterface } from 'interfaces/emergency-response-plan';
import { IncidentReportInterface } from 'interfaces/incident-report';
import { ResourceInterface } from 'interfaces/resource';
import { TrainingProgramInterface } from 'interfaces/training-program';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FireDepartmentInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  emergency_response_plan?: EmergencyResponsePlanInterface[];
  incident_report?: IncidentReportInterface[];
  resource?: ResourceInterface[];
  training_program?: TrainingProgramInterface[];
  user?: UserInterface;
  _count?: {
    emergency_response_plan?: number;
    incident_report?: number;
    resource?: number;
    training_program?: number;
  };
}

export interface FireDepartmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
  tenant_id?: string;
}
