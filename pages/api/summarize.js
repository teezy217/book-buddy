export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { bookText, summaryType } = req.body;

  if (!bookText || !summaryType) {
    return res.status(400).json({ error: "Missing bookText or summaryType" });
  }

  const prompts = {
    overview: `You are a fun, witty book summarizer. Given the book text below, write an engaging full book overview (3-5 paragraphs). Use a friendly, conversational tone. Make it snappy and enjoyable to read — no dry academic summaries! Include the main plot/argument, key moments, and why it matters. Start with an energetic hook sentence.\n\nBook text:\n${bookText.slice(0, 12000)}`,
    chapters: `You are a fun, witty book summarizer. Given the book text below, write a chapter-by-chapter (or section-by-section) breakdown. For each chapter/section, write 2-3 sentences summarizing what happens. Use emojis to make it lively. If chapters aren't clearly labeled, infer natural breaks. Keep it breezy and readable!\n\nBook text:\n${bookText.slice(0, 12000)}`,
    themes: `You are a fun, witty book summarizer. Given the book text below, identify and explain the 4-6 major themes, key ideas, and main takeaways. For each theme, give it a punchy title, a 2-3 sentence explanation, and one specific example from the text. Use an energetic, insightful tone — like a friend who just read the book and is excited to talk about it!\n\nBook text:\n${bookText.slice(0, 12000)}`,
    characters: `You are a fun, witty book summarizer. Given the book text below, create profiles of the main characters (for fiction) OR key concepts/ideas (for non-fiction). For each, write a fun 2-3 sentence profile. Include their role, personality/essence, and why they matter. Make it feel like a character trading card! Use emojis.\n\nBook text:\n${bookText.slice(0, 12000)}`,
  };

  const prompt = prompts[summaryType];
  if (!prompt) {
    return res.status(400).json({ error: "Invalid summaryType" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content.map((b) => b.text || "").join("");
    return res.status(200).json({ result: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
