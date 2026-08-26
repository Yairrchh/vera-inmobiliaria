import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { properties, barrios } from '../data/properties'

const OPERATIONS = [
  { value: 'todas', label: 'Todas' },
  { value: 'venta', label: 'Comprar' },
  { value: 'alquiler', label: 'Alquilar' },
]

function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const operation = searchParams.get('operacion') || 'todas'
  const barrio = searchParams.get('barrio') || 'todos'
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'todas' || value === 'todos' || !value) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next)
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return properties.filter((p) => {
      if (operation !== 'todas' && p.operation !== operation) return false
      if (barrio !== 'todos' && p.barrio !== barrio) return false
      if (q && !`${p.title} ${p.barrio} ${p.address}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [operation, barrio, query])

  return (
    <div className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-azure">Propiedades</p>
        <h1 className="mt-2 font-serif text-4xl text-ink">
          {results.length} {results.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
        </h1>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[64px] z-20 mt-8 border-y border-sand bg-paper/95 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 lg:px-10">
          <div className="flex overflow-hidden rounded-full border border-sand">
            {OPERATIONS.map((op) => (
              <button
                key={op.value}
                type="button"
                onClick={() => updateParam('operacion', op.value)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  operation === op.value
                    ? 'bg-ink text-white'
                    : 'text-ink/70 hover:text-ink'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>

          <select
            value={barrio}
            onChange={(event) => updateParam('barrio', event.target.value)}
            className="rounded-full border border-sand bg-white px-4 py-1.5 text-sm text-ink focus:outline-none"
          >
            <option value="todos">Todos los barrios</option>
            {barrios.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              updateParam('q', event.target.value)
            }}
            placeholder="Buscar por dirección o título"
            className="min-w-[220px] flex-1 rounded-full border border-sand bg-white px-4 py-1.5 text-sm text-ink placeholder:text-stone-light focus:outline-none"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-sand py-20 text-center">
            <p className="font-serif text-2xl text-ink">No encontramos propiedades así</p>
            <p className="mt-2 text-stone">Probá con otro barrio o quitá el filtro de búsqueda.</p>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property, i) => (
              <PropertyCard key={property.id} property={property} eager={i < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Listings
