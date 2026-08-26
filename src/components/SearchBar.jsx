import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OPERATIONS = [
  { value: 'venta', label: 'Comprar' },
  { value: 'alquiler', label: 'Alquilar' },
]

function SearchBar({ compact = false }) {
  const navigate = useNavigate()
  const [operation, setOperation] = useState('venta')
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    params.set('operacion', operation)
    if (query.trim()) params.set('q', query.trim())
    navigate(`/propiedades?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl shadow-ink/10 sm:flex-row sm:items-stretch sm:rounded-full ${
        compact ? 'max-w-xl' : 'max-w-2xl'
      }`}
    >
      <div className="flex shrink-0 p-1.5 sm:pr-0">
        {OPERATIONS.map((op) => (
          <button
            key={op.value}
            type="button"
            onClick={() => setOperation(op.value)}
            aria-pressed={operation === op.value}
            className={`rounded-full px-4 text-sm font-medium transition-colors sm:px-5 ${
              compact ? 'py-2' : 'py-2.5'
            } ${
              operation === op.value
                ? 'bg-azure text-white'
                : 'text-ink/60 hover:text-ink'
            }`}
          >
            {op.label}
          </button>
        ))}
      </div>

      <label className="flex flex-1 items-center gap-2 border-t border-sand px-4 sm:border-t-0 sm:border-l">
        <span className="sr-only">Barrio, dirección o ciudad</span>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Barrio, dirección o ciudad"
          className={`w-full bg-transparent text-sm text-ink placeholder:text-stone-light focus:outline-none ${
            compact ? 'py-2' : 'py-3'
          }`}
        />
      </label>

      <button
        type="submit"
        className={`flex shrink-0 items-center justify-center gap-2 bg-azure font-medium text-white transition-colors hover:bg-azure-deep sm:rounded-full sm:m-1.5 ${
          compact ? 'px-4 py-2 text-sm' : 'px-6 py-3'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className={compact ? 'hidden' : 'inline'}>Buscar</span>
      </button>
    </form>
  )
}

export default SearchBar
