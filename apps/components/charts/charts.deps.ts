import * as ChartJS from 'npm:chart.js';

ChartJS.Chart.register(...ChartJS.registerables);

export { ChartJS };

export type SignalChartData<
  TType extends ChartJS.ChartType = ChartJS.ChartType,
  TData = ChartJS.DefaultDataPoint<TType>,
  TLabel = unknown,
> = ChartJS.ChartData<TType, TData, TLabel>;
