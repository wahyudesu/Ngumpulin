"use client";

import { useState } from "react";
import { addDays, setHours, setMinutes, subDays } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Award,
  FileText,
  BarChart3,
  Calendar as CalendarIcon
} from "lucide-react";
import { Breadcrumb, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
// import {
//   EventCalendar,
//   type CalendarEvent,
// } from "@/registry/default/components/event-calendar"

import { EventCalendar } from "@/components/event-calendar";
// Mock data untuk demonstrasi
const mockData = {
  overview: {
    totalTugas: 45,
    totalSiswa: 28,
    pengumpulanTertunda: 12,
    rataRataNilai: 85.3
  },
  weeklyActivity: [
    { day: "Sen", pengumpulan: 8, penilaian: 6 },
    { day: "Sel", pengumpulan: 12, penilaian: 10 },
    { day: "Rab", pengumpulan: 15, penilaian: 12 },
    { day: "Kam", pengumpulan: 10, penilaian: 14 },
    { day: "Jum", pengumpulan: 18, penilaian: 16 },
    { day: "Sab", pengumpulan: 5, penilaian: 8 },
    { day: "Min", pengumpulan: 3, penilaian: 4 }
  ],
  recentAssignments: [
    {
      id: 1,
      title: "Analisis Algoritma Sorting",
      subject: "Algoritma & Struktur Data",
      dueDate: "2025-05-30",
      submitted: 22,
      total: 28,
      status: "active"
    },
    {
      id: 2,
      title: "Project Web Development",
      subject: "Pemrograman Web",
      dueDate: "2025-06-02",
      submitted: 15,
      total: 28,
      status: "active"
    },
    {
      id: 3,
      title: "Database Design",
      subject: "Basis Data",
      dueDate: "2025-05-28",
      submitted: 28,
      total: 28,
      status: "completed"
    },
    {
      id: 4,
      title: "UI/UX Prototype",
      subject: "Desain Interface",
      dueDate: "2025-06-05",
      submitted: 8,
      total: 28,
      status: "active"
    },
    {
      id: 5,
      title: "Network Security Analysis",
      subject: "Keamanan Jaringan",
      dueDate: "2025-05-25",
      submitted: 20,
      total: 28,
      status: "overdue"
    }
  ],
  topStudents: [
    { name: "Ahmad Rizki", grade: "A", score: 95.5, assignments: 12 },
    { name: "Siti Nurhaliza", grade: "A", score: 93.2, assignments: 11 },
    { name: "Budi Santoso", grade: "A-", score: 91.8, assignments: 12 },
    { name: "Maya Sari", grade: "A-", score: 90.5, assignments: 10 },
    { name: "Doni Prakoso", grade: "B+", score: 88.7, assignments: 11 },
    { name: "Fitri Handayani", grade: "B+", score: 87.9, assignments: 9 },
    { name: "Reza Firmansyah", grade: "B+", score: 86.4, assignments: 10 }
  ],
  subjects: [
    {
      name: "Algoritma & Struktur Data",
      assignments: 8,
      avgGrade: 88.5,
      completion: 92,
      students: 28
    },
    {
      name: "Pemrograman Web",
      assignments: 6,
      avgGrade: 85.2,
      completion: 87,
      students: 28
    },
    {
      name: "Basis Data",
      assignments: 7,
      avgGrade: 90.1,
      completion: 95,
      students: 28
    },
    {
      name: "Desain Interface",
      assignments: 5,
      avgGrade: 82.7,
      completion: 78,
      students: 28
    },
    {
      name: "Keamanan Jaringan",
      assignments: 4,
      avgGrade: 86.8,
      completion: 85,
      students: 28
    }
  ],
  chartData: [
    { month: 'Jan', pengumpulan: 65, penilaian: 58, rataRata: 82 },
    { month: 'Feb', pengumpulan: 72, penilaian: 68, rataRata: 85 },
    { month: 'Mar', pengumpulan: 78, penilaian: 75, rataRata: 87 },
    { month: 'Apr', pengumpulan: 85, penilaian: 82, rataRata: 89 },
    { month: 'May', pengumpulan: 88, penilaian: 85, rataRata: 85 },
    { month: 'Jun', pengumpulan: 92, penilaian: 89, rataRata: 91 }
  ],
  gradeDistribution: [
    { grade: 'A', count: 8, color: '#22c55e' },
    { grade: 'A-', count: 6, color: '#84cc16' },
    { grade: 'B+', count: 7, color: '#3b82f6' },
    { grade: 'B', count: 4, color: '#6366f1' },
    { grade: 'B-', count: 2, color: '#f59e0b' },
    { grade: 'C+', count: 1, color: '#ef4444' }
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
    case "active":
      return <Badge className="bg-blue-100 text-blue-800">Aktif</Badge>;
    case "overdue":
      return <Badge className="bg-red-100 text-red-800">Terlambat</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getGradeBadge = (grade: string) => {
  const gradeColors = {
    "A": "bg-green-500",
    "A-": "bg-green-400",
    "B+": "bg-blue-500",
    "B": "bg-blue-400",
    "B-": "bg-yellow-500",
    "C+": "bg-orange-500",
    "C": "bg-red-400"
  };
  
  return (
    <Badge className={`${gradeColors[grade as keyof typeof gradeColors] || "bg-gray-400"} text-white`}>
      {grade}
    </Badge>
  );
};

// Calendar events data with academic focus
const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Deadline: Analisis Algoritma Sorting",
    description: "Batas akhir pengumpulan tugas Algoritma & Struktur Data",
    start: new Date("2025-05-30"),
    end: new Date("2025-05-30"),
    allDay: true,
    color: "rose",
    location: "Online"
  },
  {
    id: "2",
    title: "Project Web Development",
    description: "Batas akhir pengumpulan tugas Pemrograman Web",
    start: new Date("2025-06-02"),
    end: new Date("2025-06-02"),
    allDay: true,
    color: "amber",
    location: "Online"
  },
  {
    id: "3",
    title: "Review Tugas Database Design",
    description: "Sesi review dan penilaian tugas Basis Data",
    start: setMinutes(setHours(new Date("2025-05-29"), 10), 0),
    end: setMinutes(setHours(new Date("2025-05-29"), 12), 0),
    color: "sky",
    location: "Lab Komputer"
  },
  {
    id: "4",
    title: "UI/UX Prototype Presentation",
    description: "Presentasi hasil tugas Desain Interface",
    start: setMinutes(setHours(addDays(new Date(), 1), 14), 0),
    end: setMinutes(setHours(addDays(new Date(), 1), 16), 0),
    color: "violet",
    location: "Ruang 301"
  },
  {
    id: "5",
    title: "Network Security Workshop",
    description: "Workshop keamanan jaringan dan presentasi tugas",
    start: setMinutes(setHours(addDays(new Date(), 3), 9), 0),
    end: setMinutes(setHours(addDays(new Date(), 3), 12), 0),
    color: "emerald",
    location: "Lab Jaringan"
  },
  {
    id: "6",
    title: "Midterm Evaluation",
    description: "Evaluasi tengah semester untuk semua mata kuliah",
    start: addDays(new Date(), 7),
    end: addDays(new Date(), 10),
    allDay: true,
    color: "orange",
    location: "Kampus"
  },
  {
    id: "7",
    title: "Algorithm Competition",
    description: "Kompetisi algoritma antar mahasiswa",
    start: setMinutes(setHours(addDays(new Date(), 14), 9), 0),
    end: setMinutes(setHours(addDays(new Date(), 14), 17), 0),
    color: "sky",
    location: "Auditorium"
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [events, setEvents] = useState<CalendarEvent[]>(calendarEvents);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event])
  }

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    )
  }

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  return (
    <div className="flex h-fit flex-col ">
      <header className="flex shrink-0 items-center gap-2 h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbList className="text-base">Dashboard</BreadcrumbList>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid gap-4 p-4 pb-2 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tugas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalTugas}</div>
            <p className="text-xs text-muted-foreground">
              +3 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalSiswa}</div>
            <p className="text-xs text-muted-foreground">
              Siswa aktif
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengumpulan Tertunda</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mockData.overview.pengumpulanTertunda}</div>
            <p className="text-xs text-muted-foreground">
              Memerlukan tindak lanjut
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockData.overview.rataRataNilai}</div>
            <p className="text-xs text-muted-foreground">
              +2.1% dari minggu lalu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 p-4">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="students">Siswa</TabsTrigger>
          <TabsTrigger value="subjects">Mapel</TabsTrigger>
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Top Row: Performance Chart and Grade Distribution */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Tren Performa 6 Bulan Terakhir
                </CardTitle>
                <CardDescription>Pengumpulan, penilaian, dan rata-rata nilai</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="pengumpulan" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Tingkat Pengumpulan (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="penilaian" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      name="Penilaian Selesai (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rataRata" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Rata-rata Nilai"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Distribusi Nilai
                </CardTitle>
                <CardDescription>Sebaran grade siswa</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={mockData.gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ grade, count }) => `${grade}: ${count}`}
                    >
                      {mockData.gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {mockData.gradeDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.grade}: {item.count} siswa</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row: Weekly Activity, Quick Stats, and Event Calendar */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Weekly Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Aktivitas Mingguan
                </CardTitle>
                <CardDescription>Pengumpulan dan penilaian tugas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.weeklyActivity.map((day, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 text-sm font-medium">{day.day}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Pengumpulan: {day.pengumpulan}</span>
                          <span>Penilaian: {day.penilaian}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Progress value={(day.pengumpulan / 20) * 100} className="h-2" />
                          <Progress value={(day.penilaian / 20) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Cepat</CardTitle>
                <CardDescription>Ringkasan performa terkini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tugas Selesai</span>
                    <span className="font-medium">38/45 (84%)</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tingkat Pengumpulan</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Siswa Aktif</span>
                    <span className="font-medium">26/28 (93%)</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Penilaian Selesai</span>
                    <span className="font-medium">32/38 (84%)</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Event Calendar Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Daftar Kelas
                </CardTitle>
                <CardDescription>Kegiatan dalam 7 hari ke depan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events
                    .filter(event => {
                      const eventDate = new Date(event.start);
                      const today = new Date();
                      const nextWeek = addDays(today, 7);
                      return eventDate >= today && eventDate <= nextWeek;
                    })
                    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                    .slice(0, 4)
                    .map(event => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div 
                          className={`w-3 h-3 rounded-full mt-1 ${
                            event.color === 'rose' ? 'bg-rose-500' :
                            event.color === 'amber' ? 'bg-amber-500' :
                            event.color === 'sky' ? 'bg-sky-500' :
                            event.color === 'emerald' ? 'bg-emerald-500' :
                            event.color === 'violet' ? 'bg-violet-500' :
                            event.color === 'orange' ? 'bg-orange-500' :
                            'bg-gray-500'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{event.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{event.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.start).toLocaleDateString('id-ID')}
                            </span>
                            {event.location && (
                              <span className="text-xs text-muted-foreground">• {event.location}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Siswa Terbaik
              </CardTitle>
              <CardDescription>Ranking berdasarkan performa tugas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.topStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium truncate">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {student.assignments} tugas diselesaikan
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1 flex-shrink-0">
                      {getGradeBadge(student.grade)}
                      <div className="text-sm font-medium">{student.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {mockData.subjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base leading-tight">{subject.name}</CardTitle>
                  <CardDescription>{subject.students} siswa terdaftar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-blue-600">{subject.assignments}</div>
                      <div className="text-xs text-muted-foreground">Total Tugas</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-green-600">{subject.avgGrade}</div>
                      <div className="text-xs text-muted-foreground">Rata-rata Nilai</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tingkat Penyelesaian</span>
                      <span className="font-medium">{subject.completion}%</span>
                    </div>
                    <Progress value={subject.completion} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Aktif
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
                      Lihat Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* EventCalendar */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Kalender Akademik
                </CardTitle>
                <CardDescription>Jadwal deadline dan kegiatan akademik</CardDescription>
              </CardHeader>
              <CardContent>
                <EventCalendar
                  events={events}
                  onEventAdd={handleEventAdd}
                  onEventUpdate={handleEventUpdate}
                  onEventDelete={handleEventDelete}
                />
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Kegiatan Mendatang</CardTitle>
                <CardDescription>Agenda dalam 7 hari ke depan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events
                    .filter(event => {
                      const eventDate = new Date(event.start);
                      const today = new Date();
                      const nextWeek = addDays(today, 7);
                      return eventDate >= today && eventDate <= nextWeek;
                    })
                    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                    .slice(0, 5)
                    .map(event => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div 
                          className={`w-3 h-3 rounded-full mt-1 ${
                            event.color === 'rose' ? 'bg-rose-500' :
                            event.color === 'amber' ? 'bg-amber-500' :
                            event.color === 'sky' ? 'bg-sky-500' :
                            event.color === 'emerald' ? 'bg-emerald-500' :
                            event.color === 'violet' ? 'bg-violet-500' :
                            event.color === 'orange' ? 'bg-orange-500' :
                            'bg-gray-500'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{event.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{event.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.start).toLocaleDateString('id-ID')}
                            </span>
                            {event.location && (
                              <span className="text-xs text-muted-foreground">• {event.location}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}