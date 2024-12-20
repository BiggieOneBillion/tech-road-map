export function convertToMDX(array) {
  let mdxOutput = "";
  let isCodeBlock = false; // To manage when inside a code block.

  array.forEach((item) => {
    const { type, text } = item;

    if (type === "heading") {
      mdxOutput += `# ${text}\n\n`;
    } else if (type === "subheading") {
      mdxOutput += `## ${text}\n\n`;
    } else if (type === "text") {
      if (text.trim() === "javascript") {
        // Start a code block
        isCodeBlock = true;
        mdxOutput += "```javascript\n";
      } else if (isCodeBlock && text.trim() === "") {
        // End a code block when encountering an empty line
        isCodeBlock = false;
        mdxOutput += "```\n\n";
      } else if (isCodeBlock) {
        // Inside a code block
        mdxOutput += `${text}\n`;
      } else if (text.trim() !== "") {
        // Normal text
        mdxOutput += `${text}\n\n`;
      }
    }
  });

  // Ensure any open code block is closed
  if (isCodeBlock) {
    mdxOutput += "```\n";
  }

  return mdxOutput;
}
