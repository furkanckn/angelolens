import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/ui/Section";

type Props = {
  namespace: "privacyPage" | "termsPage" | "kvkkPage" | "cookiesPage";
  keys: readonly string[];
};

export async function LegalDocument({ namespace, keys }: Props) {
  const t = await getTranslations(namespace);

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-xs tracking-[0.14em] text-muted uppercase">
          {t("updated")}
        </p>
        <div className="mt-10 space-y-8">
          {keys.map((key) => (
            <section key={key}>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {t(`sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
