"use client"

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Label,
} from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardIcon, Clock, MessageSquare, Zap } from "lucide-react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const bentoItems = [
  {
    title: "AI-Generated Plagiarism Is Widespread",
    description: "Student discipline rates for AI-related plagiarism rose from 48% in 2022-23 to 64% in 2024-24. (GovTech)",
    header: <AIPlagiarismTrend />,
    className: "md:col-span-2",
    icon: <ClipboardIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Educators are overworked",
    description: "Less time to spend with students.",
    header: <TeacherWorkloadChart />,
    className: "md:col-span-1",
    icon: <Clock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "20% of students reports delays in feedback",
    description: "Timely feedback is crucial but not always delivered to students.",
    header: <FeedbackDelaysChart />,
    className: "md:col-span-1",
    icon: <MessageSquare className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automated Grading Dramatically Reduces Workload",
    description: "AI-assisted grading systems significantly cut down grading time for educators.",
    header: <AutomatedGradingChart />,
    className: "md:col-span-2",
    icon: <Zap className="h-4 w-4 text-neutral-500" />,
  },
]

export default function Problem() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  return (
    <div ref={ref} className="flex flex-col items-center justify-center px-6 py-20 space-y-8 bg-primary">
      <h1 className="text-4xl font-bold text-white text-center">Education Needs Innovation.</h1>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] h-fit">
        {bentoItems.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={
              <ChartAnimationWrapper inView={inView} delay={i * 0.2}>
                {item.header}
              </ChartAnimationWrapper>
            }
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  )
}

function ChartAnimationWrapper({ children, inView, delay = 0 }: { children: any, inView: any, delay: any }) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeout: any
    if (inView) {
      timeout = setTimeout(() => {
        setShouldRender(true)
      }, delay * 1000)
    }
    return () => clearTimeout(timeout)
  }, [inView, delay])

  if (!shouldRender) {
    return <div className="w-full h-full flex items-center justify-center bg-card/50" />
  }

  return children
}

export function AIPlagiarismTrend() {
  const chartData = [
    { year: "2022", aiPlagiarism: 48 },
    { year: "2024", aiPlagiarism: 64 },
  ]

  const chartConfig = {
    aiPlagiarism: {
      label: "AI Plagiarism",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-[95%] h-[90%]">
        <CardContent className="p-4 h-full">
          <ChartContainer className="w-full h-full" config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 25,
                  right: 20,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  ticks={["2022", "2023", "2024", "2025"]}
                  interval={0}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area
                  type="monotone"
                  dataKey="aiPlagiarism"
                  stroke="var(--color-aiPlagiarism)"
                  fill="var(--color-aiPlagiarism)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={10}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: any) => `${value}%`}
                  />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export function TeacherWorkloadChart() {
  const chartData = [
    { task: "Planning", hours: 7, fill: "var(--color-lessonPlanning)" },
    { task: "Grading", hours: 5, fill: "var(--color-gradingFeedback)" },
    { task: "Administrative", hours: 3, fill: "var(--color-adminWork)" },
  ]

  const chartConfig = {
    hours: {
      label: "Hours",
    },
    lessonPlanning: {
      label: "Lesson Planning",
      color: "hsl(var(--chart-1))",
    },
    gradingFeedback: {
      label: "Grading & Feedback",
      color: "hsl(var(--chart-2))",
    },
    adminWork: {
      label: "Administrative Work",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  const totalHours = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.hours, 0)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-[95%] h-[90%] flex flex-col">
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="hours" nameKey="task" innerRadius={50} strokeWidth={5}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {totalHours}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs">
                            Hours/Week
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export function FeedbackDelaysChart() {
  const chartData = [
    { name: "Receive Feedback on Time", value: 79.9 },
    { name: "Delayed Feedback", value: 20.1 },
  ]

  const COLORS = ["hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-[95%] h-[90%]">
        <CardContent className="p-4 h-full flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export function AutomatedGradingChart() {
  const chartData = [
    {
      category: "Per Response",
      traditional: 100,
      aiAssisted: 69,
      reduction: 31,
    },
    {
      category: "Per Answer Sheet",
      traditional: 100,
      aiAssisted: 67,
      reduction: 33,
    },
    {
      category: "Using Gradescope",
      traditional: 100,
      aiAssisted: 55,
      reduction: 45,
    },
  ]

  const chartConfig = {
    traditional: {
      label: "Traditional Grading",
      color: "hsl(var(--chart-1))",
    },
    aiAssisted: {
      label: "AI-Assisted Grading",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-[95%] h-[90%]">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="text-sm font-medium text-center mb-2">Grading Time Reduction with AI</div>
          <ChartContainer className="w-full h-full" config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  name="Traditional Grading"
                  dataKey="traditional"
                  fill="var(--color-traditional)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  name="AI-Assisted Grading"
                  dataKey="aiAssisted"
                  fill="var(--color-aiAssisted)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                >
                  <LabelList
                    dataKey="reduction"
                    position="top"
                    formatter={(value: any) => `-${value}%`}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
