import { TRPCError } from '@trpc/server';
import { procedure, router } from './trpc';

const EDGE_INCLUDE_ENABLED = 'EDGE_INCLUDE_ENABLED';

export const appRouter = router({
  siteConfig: {
    queryConfig: procedure.query(
      async ({ ctx: { siteId, teamId, client } }) => {
        if (!teamId || !siteId) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'teamId and siteId are required',
          });
        }
        const envVars = await client.getEnvironmentVariables({
          accountId: teamId,
          siteId,
        });

        const enabledVar = envVars
          .find((val) => val.key === EDGE_INCLUDE_ENABLED)
          ?.values.find((val) => val.context === 'all');

        return {
          enabledForSite: !!enabledVar?.value && enabledVar.value !== 'false',
        };
      }
    ),

    mutateEnablement: procedure.mutation(
      async ({ ctx: { teamId, siteId, client } }) => {
        if (!teamId || !siteId) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'teamId and siteId are required',
          });
        }

        await client.createOrUpdateVariable({
          accountId: teamId,
          siteId,
          key: EDGE_INCLUDE_ENABLED,
          value: 'true',
        });

        return;
      }
    ),

    mutateDisablement: procedure.mutation(
      async ({ ctx: { teamId, siteId, client } }) => {
        if (!teamId || !siteId) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'teamId and siteId are required',
          });
        }

        try {
          await client.deleteEnvironmentVariable({
            accountId: teamId,
            siteId,
            key: EDGE_INCLUDE_ENABLED,
          });
        } catch (e) {
          console.error(
            `Failed to remove ${EDGE_INCLUDE_ENABLED} env var for site: ${siteId} and team: ${teamId}`
          );
        }
      }
    ),
  },
});

export type AppRouter = typeof appRouter;
