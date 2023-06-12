import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { emergencyResponsePlanValidationSchema } from 'validationSchema/emergency-response-plans';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.emergency_response_plan
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEmergencyResponsePlanById();
    case 'PUT':
      return updateEmergencyResponsePlanById();
    case 'DELETE':
      return deleteEmergencyResponsePlanById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEmergencyResponsePlanById() {
    const data = await prisma.emergency_response_plan.findFirst(
      convertQueryToPrismaUtil(req.query, 'emergency_response_plan'),
    );
    return res.status(200).json(data);
  }

  async function updateEmergencyResponsePlanById() {
    await emergencyResponsePlanValidationSchema.validate(req.body);
    const data = await prisma.emergency_response_plan.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEmergencyResponsePlanById() {
    const data = await prisma.emergency_response_plan.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
