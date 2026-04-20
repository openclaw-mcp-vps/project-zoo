"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Layers3, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Template } from "@/types/template";

interface TemplateCardProps {
  template: Template;
  index: number;
}

export function TemplateCard({ template, index }: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Card className="h-full overflow-hidden">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
              <p className="mt-1 text-sm text-[var(--muted)]">{template.summary}</p>
            </div>
            <Badge variant="accent">{template.category}</Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {template.stack.slice(0, 3).map((stackItem) => (
              <Badge key={`${template.id}-${stackItem}`}>{stackItem}</Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-sm text-[var(--muted)]">
          <p className="line-clamp-3">{template.description}</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-yellow-400" />
              {template.stars.toLocaleString()} stars
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5 text-blue-300" />
              {template.setupTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers3 className="h-3.5 w-3.5 text-emerald-300" />
              {template.difficulty}
            </span>
          </div>
        </CardContent>

        <CardFooter className="mt-auto flex items-center justify-between gap-2">
          <span className="text-xs text-[var(--muted)]">License: {template.license}</span>
          <Button asChild variant="secondary" size="sm">
            <Link href={`/templates/${template.slug}`}>
              Open Details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
