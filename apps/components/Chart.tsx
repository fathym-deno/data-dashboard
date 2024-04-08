import { JSX } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Button from './Button.tsx';
import * as ChartJS from 'npm:chart.js';

ChartJS.Chart.register(...ChartJS.registerables);

type ChartProps = JSX.HTMLAttributes<HTMLDivElement>;

export const IsIsland = true;

export default function Chart(props: ChartProps) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      new ChartJS.Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  const myOptions: ChartJS.ChartOptions = {};

  return <canvas ref={chartRef}></canvas>;
}
