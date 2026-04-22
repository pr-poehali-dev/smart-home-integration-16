import { useState } from "react"
import Icon from "@/components/ui/icon"

const CATEGORIES = ["Все", "Школьные", "Дополнительные"]
const LEVELS = ["Все", "Начальный", "Средний", "Продвинутый"]
const SUBJECTS = ["Математика", "Физика", "Химия", "Биология", "История", "Литература", "Информатика", "Английский", "Другое"]
const SUBJECT_COLORS: Record<string, string> = {
  Математика: "bg-blue-500",
  Физика: "bg-purple-500",
  Химия: "bg-green-500",
  Биология: "bg-emerald-500",
  История: "bg-orange-500",
  Литература: "bg-pink-500",
  Информатика: "bg-cyan-500",
  Английский: "bg-yellow-500",
  Другое: "bg-gray-400",
}
const SUBJECT_ICONS: Record<string, string> = {
  Математика: "Calculator",
  Физика: "Atom",
  Химия: "FlaskConical",
  Биология: "Leaf",
  История: "Scroll",
  Литература: "BookOpen",
  Информатика: "Monitor",
  Английский: "Languages",
  Другое: "GraduationCap",
}

interface Topic {
  id: string
  title: string
}

interface Course {
  id: string
  title: string
  description: string
  subject: string
  grade: string
  level: string
  category: string
  topics: Topic[]
  author: string
}

export default function Catalog() {
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Все")
  const [level, setLevel] = useState("Все")
  const [gradeInput, setGradeInput] = useState("")
  const [showConstructor, setShowConstructor] = useState(false)

  const filtered = courses.filter((c) => {
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === "Все" || c.category === category
    const matchLevel = level === "Все" || c.level === level
    const matchGrade = !gradeInput || c.grade.toLowerCase().includes(gradeInput.toLowerCase())
    return matchSearch && matchCategory && matchLevel && matchGrade
  })

  const handleCreateCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev])
    setShowConstructor(false)
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0f0ff 0%, #fdf0ff 50%, #fff0f8 100%)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/60 backdrop-blur-md border-b border-white/80 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
            <Icon name="BookOpen" size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">UniLearn</span>
        </div>

        <nav className="flex items-center gap-2 bg-white/80 rounded-full px-2 py-1.5 border border-gray-200">
          <a href="/" className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <Icon name="Home" size={14} />
            Главная
          </a>
          <a href="/catalog" className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm bg-violet-600 text-white font-medium">
            <Icon name="BookMarked" size={14} />
            Каталог
          </a>
        </nav>

        <button
          onClick={() => setShowConstructor(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white bg-violet-600 hover:bg-violet-700 transition-colors font-medium shadow-sm"
        >
          <Icon name="Plus" size={15} />
          Создать курс
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
        {/* Sidebar */}
        <aside className="w-60 shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <Icon name="SlidersHorizontal" size={16} className="text-gray-700" />
              <span className="font-semibold text-gray-900">Фильтры</span>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Категория</p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${
                      category === cat ? "bg-violet-600 text-white font-medium" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Уровень</p>
              <div className="flex flex-col gap-1">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${
                      level === lvl ? "bg-violet-600 text-white font-medium" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

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
              <button
                onClick={() => setShowConstructor(true)}
                className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors shadow-md"
              >
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

      {/* Course Constructor Modal */}
      {showConstructor && (
        <CourseConstructor
          onClose={() => setShowConstructor(false)}
          onCreate={handleCreateCourse}
        />
      )}
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  const colorClass = SUBJECT_COLORS[course.subject] || "bg-gray-400"
  const iconName = SUBJECT_ICONS[course.subject] || "BookOpen"
  const levelColor =
    course.level === "Начальный"
      ? "bg-green-50 text-green-600"
      : course.level === "Средний"
      ? "bg-yellow-50 text-yellow-600"
      : "bg-red-50 text-red-600"

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden cursor-pointer">
      <div className={`h-2 w-full ${colorClass}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-600">
            <Icon name={iconName as "BookOpen"} size={11} />
            {course.subject}
          </span>
          <span className="text-xs text-gray-400">{course.grade}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 text-base leading-snug">{course.title}</h3>
        {course.description && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{course.description}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Icon name="BookMarked" size={12} />
            {course.topics.length} {course.topics.length === 1 ? "тема" : course.topics.length < 5 ? "темы" : "тем"}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor}`}>{course.level}</span>
        </div>
      </div>
    </div>
  )
}

function CourseConstructor({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (course: Course) => void
}) {
  const [step, setStep] = useState<"info" | "topics">("info")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")
  const [level, setLevel] = useState("")
  const [category, setCategory] = useState("")
  const [topics, setTopics] = useState<Topic[]>([{ id: "1", title: "" }])

  const canGoNext = title.trim() && subject && grade.trim() && level && category

  const addTopic = () => {
    setTopics((prev) => [...prev, { id: Date.now().toString(), title: "" }])
  }

  const removeTopic = (id: string) => {
    if (topics.length === 1) return
    setTopics((prev) => prev.filter((t) => t.id !== id))
  }

  const updateTopic = (id: string, value: string) => {
    setTopics((prev) => prev.map((t) => (t.id === id ? { ...t, title: value } : t)))
  }

  const handleCreate = () => {
    const filledTopics = topics.filter((t) => t.title.trim())
    onCreate({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      subject,
      grade: grade.trim(),
      level,
      category,
      topics: filledTopics,
      author: "Вы",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Новый курс</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {step === "info" ? "Шаг 1 из 2 — Основная информация" : "Шаг 2 из 2 — Темы курса"}
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <Icon name="X" size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-2 px-7 pt-5">
          {["Основное", "Темы"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  (step === "info" && i === 0) || (step === "topics" && i === 1)
                    ? "bg-violet-600 text-white"
                    : i === 0 && step === "topics"
                    ? "bg-violet-100 text-violet-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {i === 0 && step === "topics" ? <Icon name="Check" size={12} /> : i + 1}
              </div>
              <span className={`text-sm ${(step === "info" && i === 0) || (step === "topics" && i === 1) ? "text-gray-900 font-medium" : "text-gray-400"}`}>{s}</span>
              {i === 0 && <div className="w-8 h-px bg-gray-200 mx-1" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {step === "info" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Название курса <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: Алгебра для 9 класса"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Описание</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Краткое описание курса..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Предмет <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {SUBJECTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSubject(s)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          subject === s
                            ? "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Класс / Группа <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="Например: 9 класс"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Уровень <span className="text-red-400">*</span></label>
                    <div className="flex flex-col gap-1">
                      {["Начальный", "Средний", "Продвинутый"].map((l) => (
                        <button
                          key={l}
                          onClick={() => setLevel(l)}
                          className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            level === l
                              ? "bg-violet-600 text-white border-violet-600"
                              : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Категория <span className="text-red-400">*</span></label>
                    <div className="flex flex-col gap-1">
                      {["Школьные", "Дополнительные"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setCategory(c)}
                          className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            category === c
                              ? "bg-violet-600 text-white border-violet-600"
                              : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "topics" && (
            <div>
              <p className="text-sm text-gray-500 mb-4">Добавьте темы — разделы из которых состоит ваш курс. Их можно дополнить позже.</p>
              <div className="space-y-2">
                {topics.map((topic, i) => (
                  <div key={topic.id} className="flex items-center gap-2">
                    <span className="w-6 text-center text-xs text-gray-400 font-mono shrink-0">{i + 1}</span>
                    <input
                      type="text"
                      value={topic.title}
                      onChange={(e) => updateTopic(topic.id, e.target.value)}
                      placeholder={`Тема ${i + 1}...`}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 text-sm"
                    />
                    <button
                      onClick={() => removeTopic(topic.id)}
                      disabled={topics.length === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-30"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addTopic}
                className="mt-3 flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
              >
                <Icon name="Plus" size={15} />
                Добавить тему
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-7 py-5 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={step === "info" ? onClose : () => setStep("info")}
            className="px-5 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors font-medium"
          >
            {step === "info" ? "Отмена" : "Назад"}
          </button>
          {step === "info" ? (
            <button
              onClick={() => setStep("topics")}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              Далее
              <Icon name="ArrowRight" size={15} />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-sm"
            >
              <Icon name="Check" size={15} />
              Создать курс
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
