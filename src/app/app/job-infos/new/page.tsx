import { BackLink } from "@/components/BackLink";
import { Card, CardContent } from "@/components/ui/card";
import { JobInfoForm } from "@/features/jobInfos/components/JobInfoForm";

export default function JobInfoNewPage() {
  return (
    <div className="container my-4 space-y-4 max-w-5xl">
      <BackLink href="/app">Dashboard</BackLink>

      <h1 className="text-3xl md:text-4xl">Create a job description</h1>

      <Card>
        <CardContent>
          <JobInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}
