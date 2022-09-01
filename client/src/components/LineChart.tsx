import {
    CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
)

interface LineChartProps{
    xValues: string[]
    yValues: number[]
}

export const LineChart = (props: LineChartProps) => {
    const options = {
        responsive: true,
        pointRadius: 0
    };

    const data = {
        labels: props.xValues,
        datasets: [
            {
                data: props.yValues,
                borderColor: 'rgb(66, 153, 225, 0.6)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 0.5
            }
        ]
    };
    return (
        <Line options={options} data={data}/>
    )
}