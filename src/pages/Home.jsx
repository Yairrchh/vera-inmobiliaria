import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import Underline from '../components/Underline'
import Reveal from '../components/Reveal'
import { properties, barrios, agents } from '../data/properties'
import { useReveal } from '../hooks/useReveal'

const STEPS = [
  {
    number: '01',
    title: 'Contanos qué buscás',
    body: 'Barrio, presupuesto, metros cuadrados. Una charla de 15 minutos con tu asesor define el rumbo.',
  },
  {
    number: '02',
    title: 'Visitamos juntos',
    body: 'Armamos un recorrido a medida. Vas a ver solo propiedades que realmente encajan.',
  },
  {
    number: '03',
    title: 'Negociamos la oferta',
    body: 'Tu asesor te acompaña en la propuesta y en cada intercambio con la otra parte.',
  },
  {
    number: '04',
    title: 'Cerramos la operación',
    body: 'Coordinamos escribanía, documentación y entrega de llaves. Vos solo mudate.',
  },
]

function Home() {
  const featured = properties.filter((p) => p.featured)
  const [processRef, processVisible] = useReveal(0.15)

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2200&q=80"
          alt="Casa moderna al atardecer, con las luces interiores encendidas"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-10 lg:pb-24">
          <p className="animate-rise text-sm font-medium uppercase tracking-[0.2em] text-white/70">
            Buenos Aires · Venta y alquiler
          </p>
          <h1
            className="animate-rise mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '90ms' }}
          >
            Encontrá tu lugar
          </h1>
          <p
            className="animate-rise mt-5 max-w-lg text-base text-white/80 sm:text-lg"
            style={{ animationDelay: '180ms' }}
          >
            Propiedades verificadas y asesores dedicados, de la primera visita hasta la
            entrega de llaves.
          </p>

          <div className="animate-rise mt-8" style={{ animationDelay: '270ms' }}>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Barrios */}
      <section className="border-b border-sand bg-paper py-8">
        <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-stone">
              Barrios
            </span>
            {barrios.map((barrio) => (
              <Link
                key={barrio}
                to={`/propiedades?barrio=${encodeURIComponent(barrio)}`}
                className="shrink-0 rounded-full border border-sand px-4 py-1.5 text-sm text-ink/70 transition-colors hover:border-azure hover:text-azure"
              >
                {barrio}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Featured listings */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-azure">
              Selección de la semana
            </p>
            <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
              Propiedades destacadas
            </h2>
          </div>
          <Link
            to="/propiedades"
            className="text-sm font-medium text-ink/70 underline decoration-sand underline-offset-4 hover:text-azure"
          >
            Ver todas las propiedades →
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((property, i) => (
            <PropertyCard key={property.id} property={property} eager={i === 0} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="border-y border-sand bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <div className={processVisible ? 'animate-rise' : 'opacity-0'}>
            <p className="text-xs font-semibold uppercase tracking-wide text-azure">
              Cómo funciona
            </p>
            <h2 className="relative mt-2 inline-block font-serif text-3xl leading-tight text-ink sm:text-4xl">
              Cuatro pasos, un solo acompañamiento
              <Underline
                className="absolute -bottom-2 left-0 text-azure"
                width={220}
                visible={processVisible}
                delay={300}
              />
            </h2>
            <p className="mt-6 max-w-sm text-stone">
              No trabajamos con carteras enormes ni asesores rotativos. Cada operación tiene
              una sola persona de contacto, de punta a punta.
            </p>
          </div>

          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <li
                key={step.number}
                className={processVisible ? 'animate-rise' : 'opacity-0'}
                style={{ animationDelay: `${120 + i * 90}ms` }}
              >
                <span className="font-serif text-2xl text-azure">{step.number}</span>
                <h3 className="mt-2 font-medium text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team teaser */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-azure">Tu asesor</p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Gente, no un catálogo</h2>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {Object.values(agents).map((agent, i) => (
            <Reveal key={agent.email} delay={i * 90} className="flex items-center gap-4">
              <img
                src={agent.photo}
                alt={agent.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-ink">{agent.name}</p>
                <p className="text-sm text-stone">{agent.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <h2 className="max-w-xl font-serif text-3xl text-white sm:text-4xl">
            ¿Pensás vender o alquilar tu propiedad?
          </h2>
          <Link
            to="/contacto"
            className="shrink-0 rounded-full bg-azure px-7 py-3 font-medium text-white transition-colors hover:bg-azure-deep"
          >
            Hablar con un asesor
          </Link>
        </Reveal>
      </section>
    </>
  )
}

export default Home
