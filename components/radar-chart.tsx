"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface RadarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
  max?: number;
}

export interface RadarChartProps {
  data: RadarChartData;
  width?: number;
  height?: number;
  className?: string;
  darkMode?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  width = 300,
  height = 300,
  className,
  darkMode = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // 清除画布
    ctx.clearRect(0, 0, width, height);

    // 设置颜色主题
    const textColor = darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
    const gridColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    // 雷达图的中心点
    const centerX = width / 2;
    const centerY = height / 2;
    // 雷达图的半径
    const radius = Math.min(width, height) / 2.5;
    
    // 坐标轴数量和角度增量
    const numAxes = data.labels.length;
    const angleIncrement = (Math.PI * 2) / numAxes;
    
    // 绘制网格和坐标轴
    const maxValue = data.max || 10;
    const numLevels = 5; // 网格层级数
    
    // 绘制同心圆和坐标轴
    for (let level = 1; level <= numLevels; level++) {
      const levelRadius = (radius * level) / numLevels;
      
      // 绘制同心圆
      ctx.beginPath();
      ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // 在最外层添加刻度值
      if (level === numLevels) {
        ctx.fillStyle = textColor;
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(String((level * maxValue) / numLevels), centerX, centerY - levelRadius - 5);
      }
    }
    
    // 绘制坐标轴和标签
    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleIncrement - Math.PI / 2; // 从顶部开始
      
      const axisEndX = centerX + radius * Math.cos(angle);
      const axisEndY = centerY + radius * Math.sin(angle);
      
      // 绘制坐标轴
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(axisEndX, axisEndY);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // 绘制标签
      const labelDistance = radius * 1.15; // 标签位置稍微超出轴的末端
      const labelX = centerX + labelDistance * Math.cos(angle);
      const labelY = centerY + labelDistance * Math.sin(angle);
      
      ctx.fillStyle = textColor;
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data.labels[i], labelX, labelY);
    }
    
    // 绘制数据集
    data.datasets.forEach((dataset, datasetIndex) => {
      const points: [number, number][] = [];

      // 计算多边形的顶点
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleIncrement - Math.PI / 2; // 从顶部开始
        const normalizedValue = Math.min(dataset.data[i], maxValue) / maxValue;
        const pointRadius = radius * normalizedValue;
        
        const pointX = centerX + pointRadius * Math.cos(angle);
        const pointY = centerY + pointRadius * Math.sin(angle);
        
        points.push([pointX, pointY]);
      }
      
      // 绘制填充的多边形
      ctx.beginPath();
      points.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point[0], point[1]);
        } else {
          ctx.lineTo(point[0], point[1]);
        }
      });
      ctx.closePath();
      
      // 设置填充样式
      const backgroundColor = dataset.backgroundColor || 
        (darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)');
      ctx.fillStyle = backgroundColor;
      ctx.fill();
      
      // 设置边框样式
      const borderColor = dataset.borderColor || 
        (darkMode ? 'rgb(59, 130, 246)' : 'rgb(59, 130, 246)');
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = dataset.borderWidth || 2;
      ctx.stroke();
      
      // 绘制数据点
      points.forEach((point, i) => {
        ctx.beginPath();
        ctx.arc(point[0], point[1], 4, 0, Math.PI * 2);
        ctx.fillStyle = borderColor;
        ctx.fill();
        
        // 添加数值标签
        const valueDistance = radius * (dataset.data[i] / maxValue) + 15;
        const valueAngle = i * angleIncrement - Math.PI / 2;
        const valueX = centerX + valueDistance * Math.cos(valueAngle);
        const valueY = centerY + valueDistance * Math.sin(valueAngle);
        
        ctx.fillStyle = textColor;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(dataset.data[i].toString(), valueX, valueY);
      });
    });
    
    // 绘制图例
    if (data.datasets.length > 0) {
      const legendX = width - 10;
      const legendY = 20;
      
      data.datasets.forEach((dataset, index) => {
        const legendItemY = legendY + index * 20;
        
        // 绘制图例颜色方块
        ctx.fillStyle = dataset.backgroundColor || 
          (darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)');
        ctx.strokeStyle = dataset.borderColor || 
          (darkMode ? 'rgb(59, 130, 246)' : 'rgb(59, 130, 246)');
        ctx.lineWidth = dataset.borderWidth || 2;
        
        ctx.fillRect(legendX - 100, legendItemY, 15, 15);
        ctx.strokeRect(legendX - 100, legendItemY, 15, 15);
        
        // 绘制图例文本
        ctx.fillStyle = textColor;
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(dataset.label, legendX - 80, legendItemY + 7);
      });
    }
  }, [data, width, height, darkMode]);

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full"
      />
    </div>
  );
};

export default RadarChart; 