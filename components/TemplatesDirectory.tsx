"use client";

import { useMemo } from "react";
import { TemplateCard } from "@/components/TemplateCard";
import { SearchFilters } from "@/components/SearchFilters";
import { useTemplateFilters } from "@/lib/template-store";
import type { Template, TemplateLicense } from "@/types/template";

interface TemplatesDirectoryProps {
  templates: Template[];
}

export function TemplatesDirectory({ templates }: TemplatesDirectoryProps) {
  const { search, stack, difficulty, license } = useTemplateFilters();

  const availableStacks = useMemo(
    () => Array.from(new Set(templates.flatMap((template) => template.stack))).sort(),
    [templates]
  );

  const availableLicenses = useMemo(
    () => Array.from(new Set(templates.map((template) => template.license))).sort() as TemplateLicense[],
    [templates]
  );

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        search.trim().length === 0 ||
        [template.name, template.summary, template.description, template.stack.join(" "), template.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStack = stack === "all" || template.stack.includes(stack);
      const matchesDifficulty = difficulty === "all" || template.difficulty === difficulty;
      const matchesLicense = license === "all" || template.license === license;

      return matchesSearch && matchesStack && matchesDifficulty && matchesLicense;
    });
  }, [templates, search, stack, difficulty, license]);

  return (
    <section className="space-y-6">
      <SearchFilters availableStacks={availableStacks} availableLicenses={availableLicenses} />

      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <p>
          Showing <span className="text-[var(--foreground)]">{filteredTemplates.length}</span> of{" "}
          <span className="text-[var(--foreground)]">{templates.length}</span> templates
        </p>
      </div>

      {filteredTemplates.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </div>
      ) : (
        <div className="surface-card rounded-xl p-10 text-center">
          <h3 className="text-lg font-semibold">No templates matched this filter set</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Broaden stack or difficulty filters to discover alternatives with similar tooling.
          </p>
        </div>
      )}
    </section>
  );
}
