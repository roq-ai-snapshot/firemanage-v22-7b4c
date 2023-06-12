import axios from 'axios';
import queryString from 'query-string';
import {
  EmergencyResponsePlanInterface,
  EmergencyResponsePlanGetQueryInterface,
} from 'interfaces/emergency-response-plan';
import { GetQueryInterface } from '../../interfaces';

export const getEmergencyResponsePlans = async (query?: EmergencyResponsePlanGetQueryInterface) => {
  const response = await axios.get(`/api/emergency-response-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmergencyResponsePlan = async (emergencyResponsePlan: EmergencyResponsePlanInterface) => {
  const response = await axios.post('/api/emergency-response-plans', emergencyResponsePlan);
  return response.data;
};

export const updateEmergencyResponsePlanById = async (
  id: string,
  emergencyResponsePlan: EmergencyResponsePlanInterface,
) => {
  const response = await axios.put(`/api/emergency-response-plans/${id}`, emergencyResponsePlan);
  return response.data;
};

export const getEmergencyResponsePlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/emergency-response-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteEmergencyResponsePlanById = async (id: string) => {
  const response = await axios.delete(`/api/emergency-response-plans/${id}`);
  return response.data;
};
