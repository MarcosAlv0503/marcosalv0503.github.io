type SectionHeadingProps = { id: string; children: string };

/** Título de sección: en escritorio se dibuja como un nodo sobre el rail del pipeline. */
export default function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <div className="relative mb-10 sm:mb-14">
      <span
        aria-hidden="true"
        className="absolute top-1/2 -left-[54px] hidden size-[13px] -translate-y-1/2 rounded-full border-2 border-accent bg-bg lg:block"
      />
      <h2
        id={id}
        className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl"
      >
        {children}
      </h2>
    </div>
  );
}
