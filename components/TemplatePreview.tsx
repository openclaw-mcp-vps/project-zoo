"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Copy, ExternalLink, Github, Lock } from "lucide-react";
import { Template } from "@/types/template";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TemplatePreviewProps = {
  template: Template;
  hasAccess: boolean;
};

type CloneResponse = {
  cloneCommand: string;
  repositoryUrl: string;
};

export function TemplatePreview({ template, hasAccess }: TemplatePreviewProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function copyCloneCommand() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/clone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: template.slug })
      });

      const result = (await response.json()) as CloneResponse & { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to generate clone command.");
      }

      await navigator.clipboard.writeText(result.cloneCommand);
      toast.success("Clone command copied. Paste it in your terminal.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to copy the clone command right now."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const isLocked = template.pricing === "premium" && !hasAccess;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-xl">Live Preview</CardTitle>
            <a
              href={template.previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm text-teal-300 hover:text-teal-200"
            >
              Open preview
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
            <iframe
              title={`${template.name} preview`}
              src={template.previewUrl}
              className="h-[380px] w-full"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Some template demos block iframe embedding. Use "Open preview" to view
            the source demo in a new tab.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Clone This Starter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{template.category}</Badge>
            <Badge variant="secondary">{template.difficulty}</Badge>
            <Badge variant={template.pricing === "premium" ? "default" : "secondary"}>
              {template.pricing === "premium" ? "Premium" : "Free"}
            </Badge>
          </div>

          <ul className="space-y-2 text-sm text-slate-300">
            {template.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>

          <div className="space-y-2 border-t border-slate-800 pt-4">
            <a
              href={template.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm text-slate-200 hover:text-slate-100"
            >
              <Github className="mr-2 h-4 w-4" />
              View repository source
            </a>
            <Button
              className="w-full"
              variant={isLocked ? "secondary" : "default"}
              disabled={isLocked || isLoading}
              onClick={copyCloneCommand}
            >
              {isLocked ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Premium Access Required
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  {isLoading ? "Generating..." : "Copy Clone Command"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
