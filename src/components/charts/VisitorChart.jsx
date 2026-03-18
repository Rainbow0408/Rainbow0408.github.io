import ReactECharts from 'echarts-for-react';
import { TiltCard } from '../TiltCard.jsx';

// Sample visitor data (will grow as real data accumulates)
const visitorData = [
  { date: '3/16', visitors: 10 },
  { date: '3/17', visitors: 22 },
  { date: '3/18', visitors: 1 },
];

export function VisitorChart() {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(30, 30, 30, 0.85)',
      borderColor: 'rgba(255, 255, 255, 0.15)',
      textStyle: { color: '#fff', fontSize: 13 },
      formatter: (params) => {
        const p = params[0];
        return `<b>${p.name}</b><br/>访客: <b style="color:#6366f1">${p.value}</b> 人`;
      }
    },
    grid: { left: '2%', right: '3%', bottom: '0%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: visitorData.map(d => d.date),
      axisLine: { lineStyle: { color: 'rgba(150,150,150,0.3)' } },
      axisLabel: { color: '#6b7280', fontWeight: 'bold', fontSize: 12 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(150,150,150,0.1)' } },
      axisLabel: { color: '#6b7280' },
    },
    series: [{
      type: 'bar',
      data: visitorData.map(d => d.visitors),
      barWidth: '50%',
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#818cf8' },
            { offset: 1, color: '#6366f1' },
          ]
        },
      },
      emphasis: {
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#a5b4fc' },
              { offset: 1, color: '#818cf8' },
            ]
          }
        }
      },
      animationDelay: (idx) => idx * 200,
    }],
    animationEasing: 'elasticOut',
  };

  const totalVisitors = visitorData.reduce((sum, d) => sum + d.visitors, 0);

  return (
    <TiltCard className="w-full h-full p-6 md:p-8 bg-white/20 dark:bg-black/20 rounded-3xl border border-white/20 shadow-xl backdrop-blur-md flex flex-col">
      <div className="flex items-center justify-between mb-4" style={{ transform: "translateZ(30px)" }}>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 drop-shadow-sm m-0">
            历史访客
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-mono text-sm mt-1 uppercase tracking-widest">
            Visitor History
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{totalVisitors}</div>
          <div className="text-xs font-mono text-gray-500">累计访客</div>
        </div>
      </div>
      <div className="flex-1 min-h-0" style={{ transform: "translateZ(10px)" }}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%', minHeight: '200px' }} 
          opts={{ renderer: 'svg' }}
        />
      </div>
    </TiltCard>
  );
}
