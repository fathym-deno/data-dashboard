import { JSX } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { ChartJS } from './charts.deps.ts';

export type ChartProps<
  TType extends ChartJS.ChartType = ChartJS.ChartType,
  TData = ChartJS.DefaultDataPoint<TType>,
  TLabel = unknown,
> =
  & {
    type: TType;

    platform?: typeof ChartJS.BasePlatform;
  }
  & Omit<JSX.HTMLAttributes<HTMLCanvasElement>, 'data' | 'type'>
  & (
    | ChartJS.ChartConfiguration<TType, TData, TLabel>
    | ChartJS.ChartConfigurationCustomTypesPerDataset<TType, TData, TLabel>
  );

export const IsIsland = true;

export default function Chart(props: ChartProps) {
  const chartRef = useRef(null);

  const { type, data, options, plugins, platform, ...htmlAttrs } = props;

  useEffect(() => {
    let chart: ChartJS.Chart | undefined = undefined;

    if (chartRef.current) {
      chart = new ChartJS.Chart(chartRef.current, {
        type,
        data,
        options,
        plugins,
        platform,
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  });

  return <canvas {...htmlAttrs} ref={chartRef}></canvas>;
}
