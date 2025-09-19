"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import { useState } from "react";

export function ResumePageClient({ jobInfoId }: { jobInfoId: string }) {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const isLoading = false;

  return (
    <div className="space-y-8 w-full">
      <Card>
        <CardHeader>
          <CardTitle>
            {isLoading ? "Analyzing your resume..." : "Upload your resume"}
          </CardTitle>
          <CardDescription>
            {isLoading
              ? "This may take a couple minutes"
              : "Get personalized feedback on your resume based on the job"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingSwap isLoading={isLoading}>
            <div
              className={cn(
                "mt-2 border-2 border-dashed rounded-lg p-6 transition-colors relative",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/50 bg-muted/10"
              )}
            >
              <label htmlFor="resume-upload" className="sr-only">
                Upload your resume
              </label>
              <input
                id="resume-upload"
                type="file"
                className="opacity-0 absolute inset-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.txt"
                onChange={() => {}}
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <UploadIcon className="size-12 text-muted-foreground mt-2" />
              <div className="space-y-2">
                <p className="text-lg">
                  Drop your resume here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports formats: PDF,Word docs, and text files
                </p>
              </div>
            </div>
          </LoadingSwap>
        </CardContent>
      </Card>

      {/* TODO: ANALYZE RESULT COMPONENT */}
      <AnalyzeResults />
    </div>
  );
}

function AnalyzeResults() {
  return <div>Analyze results</div>;
}
