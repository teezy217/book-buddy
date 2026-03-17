import { useState, useRef } from "react";
import Head from "next/head";

const COLORS = {
  bg: "#FFF9F0",
  card: "#FFFFFF",
  yellow: "#FFD166",
  coral: "#FF6B6B",
  teal: "#06D6A0",
  purple: "#9B5DE5",
  navy: "#1A1A2E",
  text: "#2D2D2D",
  muted: "#8A8A9A",
};

const summaryTypes = [
  { id: "overview", label: "📖 Full Overview", emoji: "📖", color: COLORS.coral, desc: "The big picture in a nutshell" },
  { id: "chapters", label: "🗂 Chapter-by-Chapter", emoji: "🗂", color: COLORS.purple, desc: "Break it down scene by scene" },
  { id: "themes", label: "💡 Themes & Takeaways", emoji: "💡", color: COLORS.teal, desc: "What's the author really saying?" },
  { id: "characters", label: "🧑‍🤝‍🧑 Characters & Concepts", emoji: "🧑‍🤝‍🧑", color: COLORS.yellow, desc: "Who's who and what's what" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400&family=DM+Sans:wght@400;500;600&display=swap');

  .app { min-height: 100vh; padding: 32px 20px 60px; max-width: 860px; margin: 0 auto; }

  .hero { text-align: center; margin-bottom: 40px; }
  .hero-badge { display: inline-block; background: #FFD166; color: #1A1A2E; font-weight: 600; font-size: 13px; padding: 6px 16px; border-radius: 999px; margin-bottom: 16px; border: 2px solid #1A1A2E; }
  .hero h1 { font-family: 'Fraunces', serif; font-size: clamp(36px, 7vw, 60px); font-weight: 900; line-height: 1.1; color: #1A1A2E; }
  .hero h1 span { color: #FF6B6B; font-style: italic; }
  .hero p { font-size: 17px; color: #8A8A9A; margin-top: 12px; max-width: 440px; margin-left: auto; margin-right: auto; }

  .deco-strip { display: flex; justify-content: center; gap: 8px; margin: 20px 0 36px; flex-wrap: wrap; }
  .deco-dot { width: 10px; height: 10px; border-radius: 50%; }

  .input-card { background: #fff; border: 2px solid #1A1A2E; border-radius: 20px; padding: 28px; box-shadow: 6px 6px 0 #1A1A2E; margin-bottom: 28px; }
  .input-tabs { display: flex; gap: 10px; margin-bottom: 22px; }
  .tab-btn { flex: 1; padding: 10px; border: 2px solid #1A1A2E; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; background: white; color: #1A1A2E; }
  .tab-btn.active { background: #1A1A2E; color: white; }
  .tab-btn:hover:not(.active) { background: #FFD166; }

  .drop-zone { border: 2.5px dashed #1A1A2E; border-radius: 14px; padding: 48px 24px; text-align: center; cursor: pointer; transition: all 0.2s; background: #FFF9F0; }
  .drop-zone:hover, .drop-zone.drag-over { background: #FFF3D0; border-color: #FF6B6B; }
  .drop-zone .icon { font-size: 48px; margin-bottom: 10px; }
  .drop-zone p { font-weight: 600; color: #1A1A2E; margin-bottom: 4px; }
  .drop-zone span { font-size: 13px; color: #8A8A9A; }
  .file-selected { background: #F0FFF8; border-color: #06D6A0; }
  .file-selected p { color: #06D6A0; }

  textarea { width: 100%; min-height: 180px; padding: 16px; border: 2px solid #1A1A2E; border-radius: 14px; font-family: 'DM Sans', sans-serif; font-size: 15px; resize: vertical; outline: none; background: #FFF9F0; color: #2D2D2D; transition: border-color 0.15s; }
  textarea:focus { border-color: #FF6B6B; background: white; }
  textarea::placeholder { color: #8A8A9A; }

  .section-label { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #1A1A2E; margin-bottom: 14px; }
  .type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
  @media (max-width: 500px) { .type-grid { grid-template-columns: 1fr; } }

  .type-card { border: 2px solid #1A1A2E; border-radius: 16px; padding: 16px; cursor: pointer; transition: all 0.15s; background: white; text-align: left; }
  .type-card:hover { transform: translateY(-2px); }
  .type-card.selected { box-shadow: 4px 4px 0 #1A1A2E; transform: translateY(-2px); }
  .type-card .t-emoji { font-size: 26px; margin-bottom: 6px; display: block; }
  .type-card .t-name { font-weight: 700; font-size: 14px; color: #1A1A2E; margin-bottom: 2px; }
  .type-card .t-desc { font-size: 12px; color: #8A8A9A; }

  .gen-btn { width: 100%; padding: 18px; background: #FF6B6B; color: white; border: 2px solid #1A1A2E; border-radius: 16px; font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; cursor: pointer; transition: all 0.15s; box-shadow: 4px 4px 0 #1A1A2E; display: flex; align-items: center; justify-content: center; gap: 10px; }
  .gen-btn:hover:not(:disabled) { background: #ff5252; transform: translateY(-2px); box-shadow: 6px 6px 0 #1A1A2E; }
  .gen-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .results { margin-top: 36px; }
  .result-block { background: white; border: 2px solid #1A1A2E; border-radius: 20px; margin-bottom: 20px; overflow: hidden; box-shadow: 4px 4px 0 #1A1A2E; }
  .result-header { display: flex; align-items: center; gap: 12px; padding: 18px 22px; border-bottom: 2px solid #1A1A2E; }
  .result-header .r-emoji { font-size: 24px; }
  .result-header .r-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: #1A1A2E; }
  .result-body { padding: 22px; font-size: 15px; line-height: 1.75; color: #2D2D2D; white-space: pre-wrap; }

  .loading-card { background: white; border: 2px solid #1A1A2E; border-radius: 20px; padding: 40px; text-align: center; box-shadow: 4px 4px 0 #1A1A2E; margin-bottom: 20px; }
  .loading-emoji { font-size: 48px; animation: bounce 0.8s infinite alternate; display: block; margin-bottom: 14px; }
  @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-12px); } }
  .loading-card p { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: #1A1A2E; margin-bottom: 6px; }
  .loading-card span { font-size: 14px; color: #8A8A9A; }

  .error-card { background: #FFF0F0; border: 2px solid #FF6B6B; border-radius: 14px; padding: 16px 20px; color: #FF6B6B; font-weight: 600; margin-bottom: 20px; }
`;

export default function Home() {
  const [inputMode, setInputMode] = useState("paste");
  const [pasteText, setPasteText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(["overview"]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const toggleType = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const extractTextFromPDF = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const bytes = new Uint8Array(e.target.result);
        let text = "";
        for (let i = 0; i < bytes.length; i++) {
          const c = bytes[i];
          if (c >= 32 && c < 127) text += String.fromCharCode(c);
          else if (c === 10 || c === 13) text += "\n";
        }
        text = text.replace(/[^\x20-\x7E\n]/g, " ").replace(/ {3,}/g, " ").replace(/\n{4,}/g, "\n\n");
        resolve(text.length > 200 ? text : "Could not extract sufficient text from this PDF. Please try pasting the text directly.");
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleGenerate = async () => {
    setError("");
    setResults({});

    let bookText = "";
    if (inputMode === "paste") {
      bookText = pasteText.trim();
    } else {
      if (!selectedFile) { setError("Please upload a PDF first!"); return; }
      bookText = await extractTextFromPDF(selectedFile);
    }

    if (!bookText || bookText.length < 100) {
      setError("Please provide more text — at least a page or two!");
      return;
    }
    if (selectedTypes.length === 0) {
      setError("Pick at least one summary type!");
      return;
    }

    setLoading(true);
    const newResults = {};

    for (const type of selectedTypes) {
      const label = summaryTypes.find((t) => t.id === type)?.label || type;
      setLoadingType(label);
      try {
        const res = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookText, summaryType: type }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        newResults[type] = data.result;
        setResults({ ...newResults });
      } catch (err) {
        newResults[type] = `❌ Something went wrong: ${err.message}`;
        setResults({ ...newResults });
      }
    }

    setLoading(false);
    setLoadingType("");
  };

  const hasContent = inputMode === "paste" ? pasteText.trim().length > 50 : !!selectedFile;

  return (
    <>
      <Head>
        <title>Book Buddy — Summaries for people who hate reading</title>
        <meta name="description" content="Upload any book and get fun, readable summaries instantly. No more guilt about your unread pile!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style>{styles}</style>

      <div className="app">
        <div className="hero">
          <div className="hero-badge">✨ AI-Powered Book Buddy</div>
          <h1>Too many words?<br /><span>We got you.</span></h1>
          <p>Drop in any book and get the juicy bits — no reading required (we won't judge 😅)</p>
        </div>

        <div className="deco-strip">
          {["#FF6B6B","#FFD166","#06D6A0","#9B5DE5","#FF6B6B","#FFD166","#06D6A0"].map((c, i) => (
            <div key={i} className="deco-dot" style={{ background: c }} />
          ))}
        </div>

        <div className="input-card">
          <div className="input-tabs">
            <button className={`tab-btn ${inputMode === "paste" ? "active" : ""}`} onClick={() => setInputMode("paste")}>
              ✏️ Paste Text
            </button>
            <button className={`tab-btn ${inputMode === "upload" ? "active" : ""}`} onClick={() => setInputMode("upload")}>
              📄 Upload PDF
            </button>
          </div>

          {inputMode === "paste" ? (
            <textarea
              placeholder="Paste your book text here… chapter one, here we go 📚"
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
            />
          ) : (
            <div
              className={`drop-zone ${dragOver ? "drag-over" : ""} ${selectedFile ? "file-selected" : ""}`}
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            >
              <div className="icon">{selectedFile ? "✅" : "📂"}</div>
              <p>{selectedFile ? selectedFile.name : "Drop your PDF here, or click to browse"}</p>
              <span>{selectedFile ? `${(selectedFile.size / 1024).toFixed(0)} KB` : "PDF files only"}</span>
              <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          )}
        </div>

        <div className="section-label">What do you want? 🎯</div>
        <div className="type-grid">
          {summaryTypes.map((t) => (
            <button
              key={t.id}
              className={`type-card ${selectedTypes.includes(t.id) ? "selected" : ""}`}
              style={selectedTypes.includes(t.id) ? { background: t.color + "22", borderColor: t.color } : {}}
              onClick={() => toggleType(t.id)}
            >
              <span className="t-emoji">{t.emoji}</span>
              <div className="t-name">{t.label}</div>
              <div className="t-desc">{t.desc}</div>
            </button>
          ))}
        </div>

        {error && <div className="error-card">⚠️ {error}</div>}

        <button
          className="gen-btn"
          onClick={handleGenerate}
          disabled={loading || !hasContent || selectedTypes.length === 0}
        >
          {loading ? "✨ Summarizing..." : "✨ Summarize This Book!"}
        </button>

        {(loading || Object.keys(results).length > 0) && (
          <div className="results">
            <div className="section-label" style={{ marginTop: 36 }}>Your Summary 🎉</div>

            {loading && (
              <div className="loading-card">
                <span className="loading-emoji">📖</span>
                <p>Reading so you don't have to…</p>
                <span>Working on: {loadingType}</span>
              </div>
            )}

            {summaryTypes.filter((t) => results[t.id]).map((t) => (
              <div className="result-block" key={t.id} style={{ borderColor: t.color }}>
                <div className="result-header" style={{ background: t.color + "22", borderBottomColor: t.color }}>
                  <span className="r-emoji">{t.emoji}</span>
                  <span className="r-title">{t.label}</span>
                </div>
                <div className="result-body">{results[t.id]}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
