import { Icon } from "./icons";

/**
  Input/Search — search field with a filter shortcut. Used on Home and (later) Explore.
  `compact` is the slimmer version used inside the tablet/laptop header.
*/
export function SearchBar({
  placeholder = "Search dresses, sneakers, designers…",
  defaultValue,
  compact = false,
}: {
  placeholder?: string;
  defaultValue?: string;
  compact?: boolean;
}) {
  const id = compact ? "kanta-search-header" : "kanta-search";
  return (
    <form
      role="search"
      action="/explore"
      className={`flex w-full items-center gap-3 rounded-lg border border-line bg-white pl-4 transition focus-within:border-forest ${
        compact ? "h-11 pr-1.5" : "h-[52px] pr-2"
      }`}
    >
      <Icon name="search" size={20} className="shrink-0 text-muted" />
      <label htmlFor={id} className="sr-only">
        Search Kanta
      </label>
      <input
        id={id}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="t-body min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
      />
      <button
        type="button"
        aria-label="Filters"
        className={`flex shrink-0 items-center justify-center rounded-md bg-forest text-on-brand transition active:scale-95 ${
          compact ? "size-8" : "size-[38px]"
        }`}
      >
        <Icon name="sliders" size={compact ? 16 : 18} />
      </button>
    </form>
  );
}
