import { z } from 'zod';
import type{ FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { env } from '../env';
import { accessInviteLink } from '../functions/access-invite-link';

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/invites/:subscriberId', {
        schema: {
            params: z.object({
                subscriberId: z.string(),
            }),
            response: {
                302: z.null(),
            },
        },
    }, async (request, reply) => {
        const { subscriberId } = request.params;

        await accessInviteLink({ subscriberId });

        const redirecturl = new URL(env.WEB_URL);
        redirecturl.searchParams.set('referrer', subscriberId)
        return reply.redirect(redirecturl.toString(), 302);
    });
}