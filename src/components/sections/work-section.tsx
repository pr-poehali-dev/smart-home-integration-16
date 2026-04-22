import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

const SUBJECT_COLORS: Record<string, string> = {
  Математика: "from-blue-500/20 to-blue-600/10",
  Физика: "from-purple-500/20 to-purple-600/10",
  Информатика: "from-cyan-500/20 to-cyan-600/10",
  Химия: "from-green-500/20 to-green-600/10",
  История: "from-orange-500/20 to-orange-600/10",
}

const SUBJECT_ICONS: Record<string, string> = {
  Математика: "Calculator",
  Физика: "Atom",
  Информатика: "Monitor",
  Химия: "FlaskConical",
  История: "Scroll",
}

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  const courses = [
    {
      title: "Алгебра: от основ до ЕГЭ",
      subject: "Математика",
      grade: "9–11 класс",
      level: "Продвинутый",
      topics: 42,
      author: "Автор курса",
      direction: "top",
    },
    {
      title: "Механика и динамика",
      subject: "Физика",
      grade: "10 класс",
      level: "Средний",
      topics: 28,
      author: "Автор курса",
      direction: "right",
    },
    {
      title: "Основы программирования",
      subject: "Информатика",
      grade: "8–9 класс",
      level: "Начальный",
      topics: 35,
      author: "Автор курса",
      direction: "left",
    },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 flex items-end justify-between transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <div>
            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Курсы
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">/ Популярные направления</p>
          </div>
          <MagneticButton variant="secondary" size="lg" onClick={() => (window.location.href = "/catalog")}>
            Все курсы
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CourseCard({
  course,
  index,
  isVisible,
}: {
  course: {
    title: string
    subject: string
    grade: string
    level: string
    topics: number
    author: string
    direction: string
  }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (course.direction) {
        case "left":
          return "-translate-x-12 opacity-0"
        case "right":
          return "translate-x-12 opacity-0"
        default:
          return "-translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  const gradientClass = SUBJECT_COLORS[course.subject] || "from-foreground/10 to-foreground/5"
  const iconName = SUBJECT_ICONS[course.subject] || "BookOpen"

  const levelColor =
    course.level === "Начальный"
      ? "bg-green-500/20 text-green-300"
      : course.level === "Средний"
        ? "bg-yellow-500/20 text-yellow-300"
        : "bg-red-500/20 text-red-300"

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/10 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* gradient top strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradientClass}`} />

      <div className="p-5 md:p-6">
        {/* Subject badge + grade */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-foreground/10 px-3 py-1">
            <Icon name={iconName as "BookOpen"} size={12} className="text-foreground/70" />
            <span className="font-mono text-xs text-foreground/70">{course.subject}</span>
          </div>
          <span className="font-mono text-xs text-foreground/40">{course.grade}</span>
        </div>

        {/* Title */}
        <h3 className="mb-1 font-sans text-lg font-light leading-snug text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
          {course.title}
        </h3>
        <p className="mb-4 font-mono text-xs text-foreground/40">{course.author}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-mono text-xs text-foreground/50">
            <Icon name="BookMarked" size={12} />
            {course.topics} тем
          </span>
          <span className={`rounded-full px-2.5 py-0.5 font-mono text-xs ${levelColor}`}>{course.level}</span>
        </div>
      </div>
    </div>
  )
}
