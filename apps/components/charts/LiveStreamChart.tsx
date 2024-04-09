import { JSX } from 'preact';
import { useSignal, useSignalEffect } from '@preact/signals';
import { ChartJS } from './charts.deps.ts';
import Chart, { ChartProps } from './Chart.tsx';

export type LiveStreamChartProps<
  TType extends ChartJS.ChartType = ChartJS.ChartType,
  TData = ChartJS.DefaultDataPoint<TType>,
  TLabel = unknown,
> = {
  apiPath: JSX.SignalLike<string> | string;

  data?: ChartJS.ChartData<TType, TData, TLabel>;

  dataShaper: (respData: unknown) => {
    labels: string[];
  } & ChartJS.ChartDataset<TType, TData>;
} & Omit<ChartProps<TType, TData, TLabel>, 'data'>;

export const IsIsland = true;

export default function LiveStreamChart(props: LiveStreamChartProps) {
  let { apiPath, ...chartProps } = props;

  const data = useSignal([] as ChartJS.DefaultDataPoint<typeof props.type>);

  const labels = useSignal([] as string[]);

  const dataset = useSignal(
    {} as ChartJS.ChartDataset<typeof props.type, typeof props.data>,
  );

  if (typeof apiPath === 'string') {
    apiPath = useSignal(apiPath);
  }

  const apiPathSignal = apiPath;

  async function apiCall(): Promise<void> {
    const response = await fetch(apiPathSignal.value);

    const responseData = await response.json();

    const { labels: lbls, ...ds } = props.dataShaper(responseData);

    console.log(lbls);
    const { data: d, ...s } = ds;

    console.log(d);
    console.log(s);

    data.value = d;

    dataset.value = s as ChartJS.ChartDataset<
      typeof props.type,
      typeof props.data
    >;

    labels.value = lbls;
  }

  useSignalEffect(() => {
    const interval = setInterval(() => apiCall().then(), 5000);

    apiCall().then();

    return () => clearInterval(interval);
  });

  return (
    <Chart
      {...chartProps}
      data={{
        ...chartProps.data,
        labels: labels.value,
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            // label: '# of Votes',
            // data: [12, 19, 3, 5, 2, 3],
            // borderWidth: 1
            ...dataset.value,
            data: data.value,
          },
        ],
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
