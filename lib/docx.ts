import { Document, Paragraph, TextRun, HeadingLevel, Packer } from 'docx';
import { saveAs } from 'file-saver';

export const generateCitationsDoc = async (query: string, citations: string[]) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: query,
              size: 32, // 16pt
              bold: true
            })
          ],
          spacing: {
            after: 400
          }
        }),
        ...citations.map(citation => 
          new Paragraph({
            children: [
              new TextRun({
                text: citation,
                size: 24 // 12pt
              })
            ],
            spacing: {
              after: 200,
              line: 360, // 1.5 line spacing
              lineRule: 'auto'
            }
          })
        )
      ]
    }]
  });

  // Use Packer to generate the DOCX file
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `citations-${query.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.docx`);
};