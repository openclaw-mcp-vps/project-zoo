"use client";

import { useState } from "react";
import { CheckCircle2, Copy, ExternalLink, GitBranch, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Template } from "@/types/template";

interface TemplatePreviewProps {
  template: Template;
}

interface CloneResponse {
  command: string;
  repository?: {
    stars: number;
    forks: number;
    defaultBranch: string;
    description: string | null;
  };
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const [isLoadingClone, setIsLoadingClone] = useState(false);
  const [cloneCommand, setCloneCommand] = useState("");

  async function handlePrepareClone() {
    setIsLoadingClone(true);

    try {
      const response = await fetch("/api/clone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          templateId: template.id,
          targetDirectory: template.slug
        })
      });

      if (!response.ok) {
        const errorPayload = (await response.json()) as { error?: string };
        throw new Error(errorPayload.error ?? "Unable to prepare clone command");
      }

      const payload = (await response.json()) as CloneResponse;
      setCloneCommand(payload.command);
      toast.success("Clone command ready.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create clone command.");
    } finally {
      setIsLoadingClone(false);
    }
  }

  async function copyCloneCommand() {
    if (!cloneCommand) {
      return;
    }

    await navigator.clipboard.writeText(cloneCommand);
    toast.success("Clone command copied to clipboard.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-blue-300" />
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {template.previewImages.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {template.previewImages.slice(0, 2).map((imageUrl) => (
                <div key={imageUrl} className="relative aspect-video overflow-hidden rounded-lg border border-[var(--line)]">
                  <Image src={imageUrl} alt={`${template.name} preview`} fill className="object-cover" />
                </div>
              ))}
            </div>
          ) : null}

          <p className="text-sm text-[var(--muted)]">
            This preview view helps you validate architecture and stack fit before cloning. Use the clone action to generate a ready-to-run command instantly.
          </p>

          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Clone & Launch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-[var(--muted)]">
            <p className="inline-flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-blue-300" />
              One-click clone command generation
            </p>
            <p className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-300" />
              Setup instructions included in the source repository
            </p>
          </div>

          <Button className="w-full" onClick={handlePrepareClone} disabled={isLoadingClone}>
            {isLoadingClone ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isLoadingClone ? "Preparing..." : "Generate Clone Command"}
          </Button>

          {cloneCommand ? (
            <div className="rounded-md border border-[var(--line)] bg-black/30 p-3">
              <p className="font-mono text-xs text-blue-200">{cloneCommand}</p>
              <Button onClick={copyCloneCommand} variant="secondary" size="sm" className="mt-3 w-full">
                <Copy className="h-4 w-4" />
                Copy Command
              </Button>
            </div>
          ) : null}

          <Button variant="ghost" asChild className="w-full">
            <a href={template.repoUrl} target="_blank" rel="noreferrer">
              Open GitHub Repository
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
