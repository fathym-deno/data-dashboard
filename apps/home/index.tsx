import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac/runtime';
import LiveStreamChart from '../components/charts/LiveStreamChart.tsx';
import { ChartDataset } from 'npm:chart.js';
import UserIDsChart from '../components/UserIDsChart.tsx';

export const handler: EaCRuntimeHandlerResult = {
  GET: (_req, ctx) => {
    return ctx.Render({
      Title: 'Fathym EaC Runtime',
    });
  },
};

export default function Index({ Data }: PageProps) {
  return (
    <div>
      <div class='py-16 px-4 bg-slate-500'>
        <div class='mx-auto block w-[350px] text-center'>
          <h1 class='text-4xl'>{Data.Title}</h1>

          <p class='text-lg'>
            Bring your applications and ideas to life with ease.
          </p>
        </div>

        <div class='flex flex-row py-8 align-center'>
          <UserIDsChart class='max-w-lg max-h-[400px]' />
        </div>
      </div>

      <div class='p-4'>
        <h2 class='text-2xl'>Welcome</h2>
      </div>
    </div>
  );
}
