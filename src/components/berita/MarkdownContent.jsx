import React from "react";
import { getPublicImageUrl } from "@/lib/storage-utils";

function renderInlineFormatting(text) {
  if (!text) return "";

  // Split by markdown link pattern: [label](url)
  const parts = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, label, href] = match;
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      parts.push(text.substring(lastIndex, startIndex));
    }

    parts.push(
      <a
        key={`link-${startIndex}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-600 hover:text-emerald-700 underline font-medium transition-colors"
      >
        {label}
      </a>
    );

    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // Next, parse bold and italic inside text strings
  return parts.map((part, index) => {
    if (typeof part !== "string") return part;

    // Split bold **text**
    const boldParts = part.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((subPart, subIdx) => {
      if (subPart.startsWith("**") && subPart.endsWith("**") && subPart.length > 4) {
        return <strong key={`bold-${index}-${subIdx}`} className="font-bold text-slate-900">{subPart.slice(2, -2)}</strong>;
      }

      // Split italic *text*
      const italicParts = subPart.split(/(\*.*?\*)/g);
      return italicParts.map((itPart, itIdx) => {
        if (itPart.startsWith("*") && itPart.endsWith("*") && itPart.length > 2) {
          return <em key={`italic-${index}-${subIdx}-${itIdx}`} className="italic">{itPart.slice(1, -1)}</em>;
        }
        return itPart;
      });
    });
  });
}

export default function MarkdownContent({ content }) {
  if (!content) return null;

  // Split content by newlines into blocks
  const rawLines = content.split("\n");
  const blocks = [];
  let currentList = null;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      continue;
    }

    // Check for Markdown Image: ![alt](url)
    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }

      const alt = imageMatch[1];
      const rawUrl = imageMatch[2];
      const resolvedUrl = getPublicImageUrl(rawUrl);

      blocks.push({
        type: "image",
        alt: alt || "Gambar Berita",
        url: resolvedUrl,
      });
      continue;
    }

    // Check for Heading 2: ## Heading
    if (line.startsWith("## ")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({
        type: "h2",
        text: line.replace(/^##\s+/, ""),
      });
      continue;
    }

    // Check for Heading 3: ### Heading
    if (line.startsWith("### ")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({
        type: "h3",
        text: line.replace(/^###\s+/, ""),
      });
      continue;
    }

    // Check for Blockquote: > text
    if (line.startsWith("> ")) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      blocks.push({
        type: "quote",
        text: line.replace(/^>\s+/, ""),
      });
      continue;
    }

    // Check for Bullet List: - item or * item
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const itemText = line.replace(/^[-*]\s+/, "");
      if (!currentList || currentList.type !== "unordered-list") {
        if (currentList) blocks.push(currentList);
        currentList = { type: "unordered-list", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Check for Numbered List: 1. item
    const numListMatch = line.match(/^\d+\.\s+(.*)$/);
    if (numListMatch) {
      const itemText = numListMatch[1];
      if (!currentList || currentList.type !== "ordered-list") {
        if (currentList) blocks.push(currentList);
        currentList = { type: "ordered-list", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Default: Regular Paragraph
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
    blocks.push({
      type: "paragraph",
      text: line,
    });
  }

  if (currentList) {
    blocks.push(currentList);
  }

  return (
    <div className="space-y-5 font-normal text-slate-700 text-sm sm:text-base leading-relaxed">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "image":
            return (
              <figure key={index} className="my-5 space-y-2">
                <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-950 shadow-sm transition-shadow hover:shadow-md">
                  <img
                    src={block.url}
                    alt={block.alt}
                    className="w-full max-h-[440px] object-cover rounded-2xl block"
                    loading="lazy"
                  />
                </div>
                {block.alt && block.alt !== "Gambar" && (
                  <figcaption className="text-center text-xs text-slate-500 font-medium italic">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );

          case "h2":
            return (
              <h2
                key={index}
                className="pt-3 text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug"
              >
                {renderInlineFormatting(block.text)}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={index}
                className="pt-2 text-base sm:text-lg font-bold text-slate-800 tracking-tight"
              >
                {renderInlineFormatting(block.text)}
              </h3>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="my-4 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl p-3.5 sm:p-4 italic text-slate-700 text-sm sm:text-base shadow-2xs font-normal"
              >
                {renderInlineFormatting(block.text)}
              </blockquote>
            );

          case "unordered-list":
            return (
              <ul key={index} className="my-3 list-disc list-inside space-y-1.5 pl-2 text-slate-700 font-normal text-sm sm:text-base">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderInlineFormatting(item)}</li>
                ))}
              </ul>
            );

          case "ordered-list":
            return (
              <ol key={index} className="my-3 list-decimal list-inside space-y-1.5 pl-2 text-slate-700 font-normal text-sm sm:text-base">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderInlineFormatting(item)}</li>
                ))}
              </ol>
            );

          case "paragraph":
          default:
            return (
              <p key={index} className="text-slate-700 font-normal text-sm sm:text-base leading-relaxed">
                {renderInlineFormatting(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
