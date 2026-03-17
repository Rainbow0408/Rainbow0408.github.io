import ReactECharts from 'echarts-for-react';
import { siteData } from '../../config/siteData.js';
import { TiltCard } from '../TiltCard.jsx';

export function LifecycleAreaChart() {
  const { lifecycleChart } = siteData;

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } },
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      textStyle: { color: '#fff' }
    },
    legend: {
      data: lifecycleChart.datasets.map(d => d.name),
      textStyle: { color: '#6b7280', fontWeight: 'bold' },
      top: 0
    },
    grid: {
      left: '2%', right: '3%', bottom: '0%', top: '15%', containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: lifecycleChart.xAxisLabels,
        axisLine: { lineStyle: { color: 'rgba(150,150,150,0.3)' } },
        axisLabel: { color: '#6b7280', fontWeight: 'bold' }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(150,150,150,0.1)' } },
        axisLabel: { color: '#6b7280' }
      }
    ],
    color: ['#c026d3', '#06b6d4', '#3b82f6', '#f59e0b'],
    series: lifecycleChart.datasets.map((dataset, idx) => {
      const colors = [
        ['#c026d3', '#7c3aed'],
        ['#06b6d4', '#0284c7'],
        ['#3b82f6', '#6366f1'],
        ['#f59e0b', '#ef4444']
      ];
      const [c1, c2] = colors[idx] || [dataset.color, dataset.color];
      return {
        name: dataset.name,
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 2, color: c1 },
        showSymbol: false,
        areaStyle: {
          opacity: 0.85,
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: c1 },
              { offset: 1, color: c2 + '66' }
            ]
          }
        },
        emphasis: { focus: 'series' },
        data: dataset.data
      };
    })
  };

  return (
    <TiltCard className="w-full p-6 md:p-8 bg-white/20 dark:bg-black/20 rounded-3xl border border-white/20 shadow-xl my-12 backdrop-blur-md">
       <div className="flex items-center justify-between mb-8" style={{ transform: "translateZ(30px)" }}>
         <div>
           <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 drop-shadow-sm m-0">
             生命周期投入演变图
           </h2>
           <p className="text-gray-600 dark:text-gray-400 font-mono text-sm mt-1 uppercase tracking-widest">
             Time Stacked Area Chart
           </p>
         </div>
       </div>
       <div style={{ transform: "translateZ(10px)" }}>
         <ReactECharts 
            option={option} 
            style={{ height: '400px', width: '100%' }} 
            opts={{ renderer: 'svg' }}
         />
       </div>
    </TiltCard>
  );
}
