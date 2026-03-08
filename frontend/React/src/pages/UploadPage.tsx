import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Mock results matching your Flask /predict response shape
const mockResults = [
  { disease: "Tomato - Healthy", confidence: "97.34%" },
  { disease: "Corn (Maize) - Common Rust", confidence: "91.20%" },
  { disease: "Potato - Early Blight", confidence: "88.76%" },
  { disease: "Apple - Apple Scab", confidence: "85.43%" },
  { disease: "Tomato - Late Blight", confidence: "92.11%" },
  { disease: "Grape - Black Rot", confidence: "89.55%" },
];

const UploadPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ disease: string; confidence: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    // Simulate the /predict POST call with a mock response
    setTimeout(() => {
      const mock = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(mock);
      setLoading(false);

      // Also navigate to ResultsPage with full detail
      const isHealthy = mock.disease.toLowerCase().includes("healthy");
      navigate("/results", {
        state: {
          imageUrl: previewSrc,
          result: {
            isHealthy,
            plantType: mock.disease.split(" - ")[0],
            condition: mock.disease.split(" - ")[1],
            confidence: parseFloat(mock.confidence),
            actions: isHealthy
              ? [
                  "Continue regular watering and care",
                  "Ensure adequate sunlight conditions",
                  "Monitor for any changes in appearance",
                  "Maintain good air circulation",
                ]
              : [
                  "Isolate affected plants to prevent spread",
                  "Consult with an agriculture expert",
                  "Consider appropriate treatment or methods",
                  "Monitor other plants for similar symptoms",
                ],
          },
        },
      });
    }, 2000);
  };

  return (
    <div style={styles.body}>
      {/* Teal Glow Background */}
      <div style={styles.pinkGlow} />
      
      <div style={{ ...styles.container, position: "relative", zIndex: 1 }}>
        <h1 style={styles.h1}>🌱 PlantCare AI</h1>

        {/* Upload Area */}
        <div
          style={styles.uploadArea}
          onClick={() => fileInputRef.current?.click()}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "#f0f0f0";
            (e.currentTarget as HTMLDivElement).style.borderColor = "#5568d3";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "#f9f9f9";
            (e.currentTarget as HTMLDivElement).style.borderColor = "#667eea";
          }}
        >
          <p style={{ color: "#555", fontSize: "16px" }}>
            {selectedFile ? `📁 ${selectedFile.name}` : "Click to upload plant leaf image"}
          </p>
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        {/* Preview */}
        {previewSrc && (
          <img
            id="preview"
            src={previewSrc}
            alt="Preview"
            style={styles.preview}
          />
        )}

        {/* Detect Button */}
        <button
          onClick={uploadImage}
          disabled={loading}
          style={{
            ...styles.button,
            background: loading ? "#888" : "#667eea",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#5568d3";
          }}
          onMouseLeave={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#667eea";
          }}
        >
          {loading ? "Analyzing..." : "Detect Disease"}
        </button>

        {/* Result */}
        {loading && (
          <div style={styles.result}>
            <p style={{ color: "#555" }}>Analyzing...</p>
          </div>
        )}

        {error && (
          <div style={styles.result}>
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}

        {result && !loading && (
          <div style={styles.result}>
            <h3 style={styles.resultH3}>Detection Result:</h3>
            <p style={styles.resultP}>
              <strong>Disease:</strong> {result.disease}
            </p>
            <p style={styles.resultP}>
              <strong>Confidence:</strong> {result.confidence}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline styles matching your original style.css exactly
const styles: Record<string, React.CSSProperties> = {
  body: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 16px",
    background: "white",
  },
  pinkGlow: {
    position: "absolute",
    inset: "0",
    zIndex: "0",
    backgroundImage: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)",
    backgroundSize: "100% 100%",
  },
  container: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    maxWidth: "500px",
    width: "90%",
  },
  h1: {
    color: "#667eea",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2em",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  uploadArea: {
    border: "3px dashed #667eea",
    borderRadius: "10px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s",
    background: "#f9f9f9",
  },
  button: {
    background: "#667eea",
    color: "white",
    border: "none",
    padding: "15px 30px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    width: "100%",
    transition: "background 0.3s",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  preview: {
    maxWidth: "100%",
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    display: "block",
  },
  result: {
    marginTop: "20px",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "10px",
    borderLeft: "4px solid #667eea",
  },
  resultH3: {
    color: "#667eea",
    marginBottom: "10px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  resultP: {
    margin: "8px 0",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
};

export default UploadPage;
