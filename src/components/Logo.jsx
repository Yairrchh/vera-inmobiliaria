function Logo({ dark = false }) {
  return (
    <span
      className={`font-serif text-2xl font-semibold tracking-tight ${
        dark ? 'text-ink' : 'text-white'
      }`}
    >
      Vera<span className="text-azure">.</span>
    </span>
  )
}

export default Logo
