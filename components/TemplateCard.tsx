"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Lock, Timer } from "lucide-react";
import { Template } from "@/types/template";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TemplateCardProps = {
  template: Template;
  onClone: (slug: string) => void;
  isLocked: boolean;
};

export function TemplateCard({ template, onClone, isLocked }: TemplateCardProps) {
  return (
    <Card className="h-full transition hover:border-teal-400/30 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.3)]">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge variant={template.pricing === "premium" ? "default" : "secondary"}>
            {template.pricing === "premium" ? "Premium" : "Free"}
          </Badge>
          <span className="text-xs text-slate-400">{template.stars.toLocaleString()} stars</span>
        </div>
        <CardTitle className="text-lg">{template.name}</CardTitle>
        <CardDescription>{template.tagline}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {template.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Timer className="h-4 w-4" />
          Setup in about {template.setupTimeMinutes} minutes
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <Button
          variant={isLocked ? "secondary" : "default"}
          className="w-full"
          onClick={() => onClone(template.slug)}
          disabled={isLocked}
        >
          {isLocked ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Unlock to Clone
            </>
          ) : (
            <>
              <Github className="mr-2 h-4 w-4" />
              Copy Clone Command
            </>
          )}
        </Button>

        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={`/template/${template.slug}`}>
            Details
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
