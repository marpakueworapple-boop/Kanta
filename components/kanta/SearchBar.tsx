import { Icon } from "./icons";

/** Input/Search — search field with a filter shortcut. Used on Home and (later) Explore. */
export function SearchBar({
  placeholder = "Search dresses, sneakers, designers…",
  defaultValue,
}: {
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <form
      role="search"
      action="/explore"
      className="flex h-[52px] w-full items-center gap-3 rounded-lg border border-line bg-white pr-2 pl-4"
    >
      <Icon name="search" size={20} className="shrink-0 text-muted" />
      <label htmlFor="kanta-search" className="sr-only">
        Search Kanta
      </label>
      <input
        id="kanta-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="t-body min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
      />
      <button
        type="button"
        aria-label="Filters"
        className="flex size-[38px] shrink-0 items-center justify-center rounded-md bg-forest text-on-brand transition active:scale-95"
      >
        <Icon name="sliders" size={18} />
      </button>
    </form>
  );
}
