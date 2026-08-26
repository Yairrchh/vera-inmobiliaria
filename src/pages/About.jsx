import { agents } from '../data/properties'
import Underline from '../components/Underline'
import { useReveal } from '../hooks/useReveal'

const MILESTONES = [
  { year: '2014', text: 'Martín Vera abre la primera oficina, dos escritorios en Belgrano.' },
  { year: '2018', text: 'Primeras operaciones en Puerto Madero y Núñez. El equipo llega a cinco personas.' },
  { year: '2021', text: 'Sumamos alquileres a la cartera y abrimos una segunda oficina en Palermo.' },
  { year: '2026', text: 'Más de 600 operaciones cerradas, siempre con un asesor único por cliente.' },
]

const team = [
  {
    name: 'Martín Vera',
    role: 'Fundador',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  ...Object.values(agents),
]

function About() {
  const [headingRef, headingVisible] = useReveal(0.3)

  return (
    <div className="pt-28 sm:pt-32">
      <section className="mx-auto max-w-4xl px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-azure">Nosotros</p>
        <h1
          ref={headingRef}
          className="relative mt-2 inline-block font-serif text-4xl leading-tight text-ink sm:text-5xl"
        >
          Menos cartera, más criterio
          <Underline
            className="absolute -bottom-2 left-0 text-azure"
            width={260}
            visible={headingVisible}
          />
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/80">
          Vera nació en 2014 de una idea simple: una inmobiliaria no necesita miles de
          propiedades para ser buena, necesita conocer bien cada una. Seguimos siendo un
          equipo chico a propósito — así cada cliente tiene un solo asesor, de la primera
          visita a la escritura.
        </p>
      </section>

      {/* Timeline */}
      <section className="mx-auto mt-20 max-w-4xl border-t border-sand px-6 py-16 lg:px-10">
        <h2 className="font-serif text-2xl text-ink">Cómo llegamos hasta acá</h2>
        <ol className="mt-8 space-y-8">
          {MILESTONES.map((m) => (
            <li key={m.year} className="flex gap-6">
              <span className="w-14 shrink-0 font-serif text-xl text-azure">{m.year}</span>
              <p className="text-ink/80">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl border-t border-sand px-6 py-16 lg:px-10">
        <h2 className="font-serif text-2xl text-ink">El equipo</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person) => (
            <div key={person.name}>
              <div className="aspect-square overflow-hidden rounded-xl bg-sand">
                <img src={person.photo} alt={person.name} className="h-full w-full object-cover" />
              </div>
              <p className="mt-3 font-medium text-ink">{person.name}</p>
              <p className="text-sm text-stone">{person.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
