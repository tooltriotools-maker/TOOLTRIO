'use client'
/**
 * DynamicRecharts - single dynamic() boundary for ALL recharts components.
 * Import from here instead of 'recharts' in any CalculatorClient.
 * Recharts (~500kb) loads only after the page is interactive.
 */
export {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  ComposedChart,
  RadialBarChart, RadialBar,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
  ReferenceLine, ReferenceArea,
  Scatter, ScatterChart,
  FunnelChart, Funnel,
  LabelList, Label,
} from 'recharts'
