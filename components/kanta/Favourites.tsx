"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { setFavourite } from "@/app/favourites/actions";

type Ctx = {
  signedIn: boolean;
  saved: ReadonlySet<string>;
  toggle: (productId: string, title: string) => void;
};

const FavouritesContext = createContext<Ctx | null>(null);

function goToSignIn() {
  const here = window.location.pathname + window.location.search;
  window.location.assign(`/login?next=${encodeURIComponent(here)}`);
}

/**
  Remembers which products the signed-in shopper has saved, for every page.
  The starting list comes from Supabase on the server; each tap saves straight to Supabase.
*/
export function FavouritesProvider({
  signedIn,
  initialIds,
  children,
}: {
  signedIn: boolean;
  initialIds: string[];
  children: React.ReactNode;
}) {
  const [saved, setSaved] = useState<Set<string>>(() => new Set(signedIn ? initialIds : []));
  const [notice, setNotice] = useState<string | null>(null);
  const busy = useRef(new Set<string>());

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const toggle = useCallback(
    (productId: string, title: string) => {
      if (!signedIn) {
        goToSignIn();
        return;
      }
      if (busy.current.has(productId)) return;
      const save = !saved.has(productId);

      const apply = (on: boolean) =>
        setSaved((prev) => {
          const next = new Set(prev);
          if (on) next.add(productId);
          else next.delete(productId);
          return next;
        });

      apply(save); // show the change straight away
      busy.current.add(productId);
      setFavourite(productId, save)
        .then((res) => {
          if (res.ok) return;
          apply(!save); // put the heart back
          if (res.reason === "signed-out") goToSignIn();
          else setNotice(`Couldn't ${save ? "save" : "remove"} ${title}. Please try again.`);
        })
        .catch(() => {
          apply(!save);
          setNotice("You seem to be offline. Please check your connection and try again.");
        })
        .finally(() => busy.current.delete(productId));
    },
    [signedIn, saved],
  );

  const value = useMemo(() => ({ signedIn, saved, toggle }), [signedIn, saved, toggle]);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-5 md:bottom-8"
      >
        {notice && (
          <p className="t-cap pointer-events-auto max-w-sm rounded-full bg-ink px-4 py-2.5 text-center text-on-brand shadow-lg">
            {notice}
          </p>
        )}
      </div>
    </FavouritesContext.Provider>
  );
}

/** Heart state for one product. Works without the provider too (e.g. design-system page): taps then go to sign-in. */
export function useFavourite(productId: string, title: string) {
  const ctx = useContext(FavouritesContext);
  return {
    saved: ctx ? ctx.saved.has(productId) : false,
    toggle: () => (ctx ? ctx.toggle(productId, title) : goToSignIn()),
  };
}

/** All saved ids (used by the Favourites page so removed pieces disappear straight away). */
export function useSavedIds(): ReadonlySet<string> {
  return useContext(FavouritesContext)?.saved ?? new Set();
}
