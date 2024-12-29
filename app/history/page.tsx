"use client";

import { Card } from "@/components/ui/card";
import { getHistory } from "@/lib/api";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { DownloadButton } from "@/components/download-button";

interface HistoryEntry {
  query: string;
  format: string;
  references: string[];
  createdAt: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data.history);
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <p className="text-center">Loading history...</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Citation History</h1>
        {history.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              No citations generated yet.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {history.map((entry, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString()} -{" "}
                      {entry.format.toUpperCase()}
                    </p>
                    <p className="font-medium">Search: {entry.query}</p>
                  </div>
                  <DownloadButton query={entry.query} citations={entry.references} />
                </div>
                <div className="space-y-4">
                  {entry.references.map((reference, refIndex) => (
                    <div
                      key={refIndex}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}