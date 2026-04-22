import { useState } from "react"
import Icon from "@/components/ui/icon"

const CATEGORIES = ["Все", "Школьные", "Дополнительные"]
const LEVELS = ["Все", "Начальный", "Средний", "Продвинутый"]

interface Course {
  id: number
  title: string
  subject: string
  grade: string
  level: string
  category: string
  topics: number
  author: string
  color: string
}

const MOCK_COURSES: Course[] = []

export default function Catalog() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Все")
  const [level, setLevel] = useState("Все")
  const [gradeInput, setGradeInput] = useState("")

  const filtered = MOCK_COURSES.filter((c) => {
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === "Все" || c.category === category
    const matchLevel = level === "Все" || c.level === level
    const matchGrade = !gradeInput || c.grade.includes(gradeInput)
    return matchSearch && matchCategory && matchLevel && matchGrade
  })

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0f0ff 0%, #fdf0ff 50%, #fff0f8 100%)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/60 backdrop-blur-md border-b border-white/80">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
            <Icon name="BookOpen" size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">UniLearn</span>
        </div>

        <nav className="flex items-center gap-2 bg-white/80 rounded-full px-2 py-1.5 border border-gray-200">
          <a
            href="/"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Icon name="Home" size={14} />
            Главная
          </a>
          <a
            href="/catalog"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm bg-violet-600 text-white font-medium"
          >
            <Icon name="BookMarked" size={14} />
            Каталог
          </a>
        </nav>

        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200">
          <Icon name="LogIn" size={15} />
          Войти
        </button>
      </header>

      {/* Search hero */}
      <div className="px-8 py-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог курсов</h1>
        <p className="text-gray-500 mb-6">Найдите нужные занятия для всестороннего развития</p>
        <div className="max-w-2xl mx-auto relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию или описанию..."
            className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-sm text-sm"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="px-8 pb-12 flex gap-6 max-w-7xl mx-auto">
        {/* Sidebar filters */}
        <aside className="w-60 shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <Icon name="SlidersHorizontal" size={16} className="text-gray-700" />
              <span className="font-semibold text-gray-900">Фильтры</span>
            </div>

            {/* Category */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Категория</p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${
                      category === cat
                        ? "bg-violet-600 text-white font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Уровень</p>
              <div className="flex flex-col gap-1">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${
                      level === lvl
                        ? "bg-violet-600 text-white font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Класс / Группа</p>
              <input
                type="text"
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
                placeholder="Например: 9 класс"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>
        </aside>

        {/* Courses grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-24 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-5">
                <Icon name="BookOpen" size={36} className="text-violet-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Нет курсов</h2>
              <p className="text-gray-500 mb-6 max-w-xs">
                Здесь пока ничего нет. Создайте первый курс, чтобы начать обучение!
              </p>
              <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors shadow-md">
                Создать первый курс
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden cursor-pointer">
      <div className={`h-2 w-full ${course.color}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-violet-50 text-violet-600">
            {course.subject}
          </span>
          <span className="text-xs text-gray-400">{course.grade}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 text-base leading-snug">{course.title}</h3>
        <p className="text-xs text-gray-400 mb-4">{course.author}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Icon name="BookMarked" size={12} />
            {course.topics} тем
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              course.level === "Начальный"
                ? "bg-green-50 text-green-600"
                : course.level === "Средний"
                ? "bg-yellow-50 text-yellow-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {course.level}
          </span>
        </div>
      </div>
    </div>
  )
}
