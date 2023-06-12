import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { emergencyResponsePlanValidationSchema } from 'validationSchema/emergency-response-plans';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEmergencyResponsePlans();
    case 'POST':
      return createEmergencyResponsePlan();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEmergencyResponsePlans() {
    const data = await prisma.emergency_response_plan
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'emergency_response_plan'));
    return res.status(200).json(data);
  }

  async function createEmergencyResponsePlan() {
    await emergencyResponsePlanValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.emergency_response_plan.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
