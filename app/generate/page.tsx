"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateReferences } from "@/lib/api";
import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";
import { creditsManager } from "@/lib/credits";
import { DownloadButton } from "@/components/download-button";

export default function Generate() {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("apa");
  const [count, setCount] = useState(1);
  const [references, setReferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await generateReferences(query, format, count);
      setReferences(data.references);
      creditsManager.updateCredits(data.credits);
      toast.success("Your citations are ready!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Citation has been copied to your clipboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="query">Search Query</Label>
              <Input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter title, author, or keywords"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Citation Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apa">APA</SelectItem>
                    <SelectItem value="mla">MLA</SelectItem>
                    <SelectItem value="harvard">Harvard</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="count">Number of Citations</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="10"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Citations"}
            </Button>
          </form>
        </Card>

        {references.length > 0 && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Citations</h2>
              <DownloadButton query={query} citations={references} />
            </div>
            <div className="space-y-4">
              {references.map((reference, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted rounded-lg relative group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(reference)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <p className="pr-8">{reference}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}