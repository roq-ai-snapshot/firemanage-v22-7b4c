import axios from 'axios';
import queryString from 'query-string';
import { IncidentReportInterface, IncidentReportGetQueryInterface } from 'interfaces/incident-report';
import { GetQueryInterface } from '../../interfaces';

export const getIncidentReports = async (query?: IncidentReportGetQueryInterface) => {
  const response = await axios.get(`/api/incident-reports${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createIncidentReport = async (incidentReport: IncidentReportInterface) => {
  const response = await axios.post('/api/incident-reports', incidentReport);
  return response.data;
};

export const updateIncidentReportById = async (id: string, incidentReport: IncidentReportInterface) => {
  const response = await axios.put(`/api/incident-reports/${id}`, incidentReport);
  return response.data;
};

export const getIncidentReportById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/incident-reports/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteIncidentReportById = async (id: string) => {
  const response = await axios.delete(`/api/incident-reports/${id}`);
  return response.data;
};
