import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { generateCitationsDoc } from "@/lib/docx";

interface DownloadButtonProps {
  query: string;
  citations: string[];
}

export function DownloadButton({ query, citations }: DownloadButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={() => generateCitationsDoc(query, citations)}
    >
      <FileDown className="h-4 w-4" />
      Download DOCX
    </Button>
  );
}