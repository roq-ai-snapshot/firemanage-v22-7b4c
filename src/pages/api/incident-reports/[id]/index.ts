import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { incidentReportValidationSchema } from 'validationSchema/incident-reports';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.incident_report
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getIncidentReportById();
    case 'PUT':
      return updateIncidentReportById();
    case 'DELETE':
      return deleteIncidentReportById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getIncidentReportById() {
    const data = await prisma.incident_report.findFirst(convertQueryToPrismaUtil(req.query, 'incident_report'));
    return res.status(200).json(data);
  }

  async function updateIncidentReportById() {
    await incidentReportValidationSchema.validate(req.body);
    const data = await prisma.incident_report.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteIncidentReportById() {
    const data = await prisma.incident_report.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
