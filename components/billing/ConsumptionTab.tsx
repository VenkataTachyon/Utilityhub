'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { mockConsumptionResponse } from '@/lib/mockData';
import { Card, Button, SegmentedControl, StatMini } from '@/components/ui';
import { useTheme } from '@/lib/ThemeContext';

export function ConsumptionTab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<unknown>(null);
  const [granularity, setGranularity] = useState('Monthly');
  const { theme } = useTheme();
  const { records, statistics } = mockConsumptionResponse;

  const inputCls = 'px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500';

  useEffect(() => {
    if (!canvasRef.current) return;
    import('chart.js/auto').then((ChartModule) => {
      const Chart = ChartModule.default;
      if (chartRef.current) (chartRef.current as { destroy: () => void }).destroy();
      const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
      const tickColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
      chartRef.current = new Chart(canvasRef.current!, {
        type: 'bar',
        data: {
          labels: records.map((r) => r.label),
          datasets: [
            { type: 'bar' as const, label: 'Usage (kWh)', data: records.map((r) => r.usageAmount), backgroundColor: '#1D4ED8', yAxisID: 'y', borderRadius: 3 },
            { type: 'line' as const, label: 'Cost ($)', data: records.map((r) => r.cost), borderColor: '#F59E0B', backgroundColor: 'transparent', yAxisID: 'y2', tension: 0.4, pointRadius: 3, pointBackgroundColor: '#F59E0B' },
            { type: 'line' as const, label: 'Prior year (kWh)', data: records.map((r) => r.priorYearUsage ?? 0), borderColor: '#9CA3AF', borderDash: [4, 3], backgroundColor: 'transparent', yAxisID: 'y', tension: 0.4, pointRadius: 0 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { autoSkip: false, maxRotation: 45, font: { size: 10 }, color: tickColor }, grid: { display: false } },
            y: { position: 'left', ticks: { font: { size: 10 }, color: tickColor, callback: (v: unknown) => `${v} kWh` }, grid: { color: gridColor } },
            y2: { position: 'right', ticks: { font: { size: 10 }, color: tickColor, callback: (v: unknown) => `$${v}` }, grid: { display: false } },
          },
        },
      });
    });
    return () => { if (chartRef.current) (chartRef.current as { destroy: () => void }).destroy(); };
  }, [records, granularity, theme]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <SegmentedControl options={['Monthly', 'Daily', 'Yearly']} value={granularity} onChange={setGranularity} />
        <input type="date" defaultValue="2025-06-01" className={inputCls} />
        <input type="date" defaultValue="2026-06-22" className={inputCls} />
        <Button size="sm">
          <FontAwesomeIcon icon={faFileCsv} className="w-3 h-3" /> CSV export
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
        <StatMini label="Avg monthly" value={`${statistics.averageMonthly} kWh`} />
        <StatMini label="Peak month" value={`${statistics.peakUsage} kWh`} sub={statistics.peakMonth} />
        <StatMini label="Lowest month" value={`${statistics.lowestUsage} kWh`} sub={statistics.lowestMonth} />
        <StatMini label="YTD total" value={`${statistics.ytdTotal.toLocaleString()} kWh`} />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Usage &amp; cost — last 12 months</span>
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-700 inline-block" />kWh</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-400 inline-block" />Cost</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-gray-300 inline-block" />Prior yr</span>
          </div>
        </div>
        <div className="relative h-[220px]">
          <canvas ref={canvasRef} aria-label="Monthly electricity consumption" role="img" />
        </div>
      </Card>
    </div>
  );
}
