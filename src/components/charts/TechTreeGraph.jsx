import ReactECharts from 'echarts-for-react';
import { siteData } from '../../config/siteData.js';
import { TiltCard } from '../TiltCard.jsx';

// Recursive builder for ECharts tree
function buildTree(data, parentId = null) {
  const statusColors = {
    unlocked:  { color: '#818cf8', borderColor: '#c7d2fe', labelColor: '#fff' },
    training:  { color: '#f59e0b', borderColor: '#fcd34d', labelColor: '#fef3c7' },
    locked:    { color: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)', labelColor: '#6b7280' }
  };
  return data
    .filter(item => item.parent === parentId)
    .map(item => {
      const s = statusColors[item.status] || statusColors.locked;
      return {
        name: item.label,
        value: item.status,
        itemStyle: { color: s.color, borderColor: s.borderColor, borderWidth: 2 },
        label: { color: s.labelColor },
        children: buildTree(data, item.id)
      };
    });
}

export function TechTreeGraph() {
  const { techTree } = siteData;

  const rootTechNode = buildTree(techTree, null)[0];

  const treeOption = {
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [
      {
        type: 'tree',
        data: [rootTechNode || { name: 'No Data' }],
        top: '10%', left: '15%', bottom: '10%', right: '20%',
        symbolSize: 14,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#e5e7eb',
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: [4, 8],
          borderRadius: 4
        },
        leaves: {
          label: { position: 'right', verticalAlign: 'middle', align: 'left' }
        },
        emphasis: { focus: 'descendant' },
        lineStyle: {
           color: 'rgba(129, 140, 248, 0.5)',
           width: 2,
           curveness: 0.5
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  };

  return (
    <div className="my-16 w-full relative z-10">
      <TiltCard className="p-8 bg-white/10 dark:bg-black/20 rounded-3xl border border-white/20 shadow-xl backdrop-blur-lg w-full">
         <div className="flex flex-col items-center justify-center">
           <h2 className="text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-6 drop-shadow-sm flex items-center gap-3 relative" style={{ transform: "translateZ(30px)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              动态技能树
           </h2>
           <p className="font-mono text-gray-500 dark:text-gray-400 -mt-4 mb-6 tracking-[0.2em] uppercase text-sm" style={{ transform: "translateZ(30px)" }}>TECH TREE</p>
         </div>
         <div className="w-full" style={{ transform: "translateZ(10px)" }}>
           <ReactECharts option={treeOption} style={{ height: '600px', width: '100%' }} opts={{ renderer: 'svg' }} />
         </div>
      </TiltCard>
    </div>
  );
}
