import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <GraduationCap className="h-16 w-16 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Generate Perfect Citations
            <br />
            <span className="text-primary">In Seconds</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            CitePro helps you create accurate citations in MLA, APA, Harvard, and Chicago formats.
            Save time and ensure your references are properly formatted.
          </p>
          <div className="flex gap-4">
            <Link href="/generate">
              <Button size="lg">Start Citing</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline">Create Account</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
            <p className="text-muted-foreground">
              Support for MLA, APA, Harvard, and Chicago citation styles.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-muted-foreground">
              Find academic papers and articles with our intelligent search engine.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Citation History</h3>
            <p className="text-muted-foreground">
              Access your previously generated citations anytime.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}