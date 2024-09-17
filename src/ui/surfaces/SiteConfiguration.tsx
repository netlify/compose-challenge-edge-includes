import {
  Card,
  CardTitle,
  Button,
  SiteConfigurationSurface,
  CardLoader,
} from '@netlify/sdk/ui/react/components';
import { trpc } from '../trpc';

export const SiteConfiguration = () => {
  const trpcUtils = trpc.useUtils();
  const siteConfigQuery = trpc.siteConfig.queryConfig.useQuery();
  const siteEnablementMutation = trpc.siteConfig.mutateEnablement.useMutation({
    onSuccess: async () => {
      await trpcUtils.siteConfig.queryConfig.invalidate();
    },
  });
  const siteDisablementMutation = trpc.siteConfig.mutateDisablement.useMutation(
    {
      onSuccess: async () => {
        await trpcUtils.siteConfig.queryConfig.invalidate();
      },
    }
  );

  const onEnableHandler = () => {
    siteEnablementMutation.mutate();
  };

  const onDisableHandler = () => {
    siteDisablementMutation.mutate();
  };

  if (siteConfigQuery.isLoading) {
    return <CardLoader />;
  }

  return (
    <SiteConfigurationSurface>
      <Card>
        {siteConfigQuery.data?.enabledForSite ? (
          <>
            <CardTitle>Disable for site</CardTitle>
            <div>
              <p>
                Disabling this affects the Content-Security-Policy header of
                future deploys.
              </p>
              <Button
                className='tw-mt-4'
                loading={siteDisablementMutation.isPending}
                onClick={onDisableHandler}
                variant='danger'
              >
                Disable
              </Button>
            </div>
          </>
        ) : (
          <>
            <CardTitle>Enable for site</CardTitle>
            <div>
              <p>
                Enabling affects the Content-Security-Policy header of future
                deploys.
              </p>
              <Button
                className='tw-mt-4'
                loading={siteEnablementMutation.isPending}
                onClick={onEnableHandler}
              >
                Enable
              </Button>
            </div>
          </>
        )}
      </Card>
    </SiteConfigurationSurface>
  );
};
