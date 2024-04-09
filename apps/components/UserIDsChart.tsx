// deno-lint-ignore-file no-explicit-any
import { JSX } from 'preact';
import LiveStreamChart from './charts/LiveStreamChart.tsx';

export type UserIDsChartProps = Omit<
  JSX.HTMLAttributes<HTMLCanvasElement>,
  'data' | 'type'
>;

export const IsIsland = true;

export default function UserIDsChart(props: UserIDsChartProps) {
  return (
    <LiveStreamChart
      {...props}
      type='bar'
      apiPath='/api-reqres/users'
      dataShaper={(d: any) => {
        const sorted = d.data.sort(() => (Math.random() > Math.random() ? 1 : -1));

        return {
          labels: sorted.map((u: any) => u.first_name),
          label: 'Users ID',
          data: sorted.map((u: any) => u.id),
          borderWidth: 1,
        };
      }}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
}
