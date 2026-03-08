import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw, Home, Leaf, AlertTriangle } from "lucide-react";

interface AnalysisResult {
  isHealthy: boolean;
  plantType: string;
  condition: string;
  confidence: number;
  actions: string[];
}

interface LocationState {
  imageUrl: string;
  result: AnalysisResult;
}

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No analysis result found.</p>
          <Link to="/upload" className="px-6 py-3 rounded-xl gradient-hero text-primary-foreground font-semibold shadow-primary">
            Upload an Image
          </Link>
        </div>
      </div>
    );
  }

  const { imageUrl, result } = state;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-foreground mb-2">Analysis Complete</h1>
            <p className="text-muted-foreground">Here's what we found</p>
          </motion.div>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Uploaded Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Uploaded Image</h2>
            <div className="rounded-2xl overflow-hidden border border-border shadow-card">
              <img src={imageUrl} alt="Uploaded plant" className="w-full h-72 object-cover" />
            </div>
          </motion.div>

          {/* Results Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-3xl border-2 p-6 shadow-card ${
              result.isHealthy
                ? "border-primary/40 bg-card"
                : "border-destructive/30 bg-card"
            }`}
          >
            {/* Status Badge */}
            <div className="flex justify-center mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  result.isHealthy
                    ? "bg-primary-light text-primary"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {result.isHealthy ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {result.isHealthy ? "Healthy Plant" : "Disease Detected"}
              </span>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${
                  result.isHealthy
                    ? "border-primary bg-primary-light"
                    : "border-destructive/40 bg-destructive/10"
                }`}
              >
                {result.isHealthy ? (
                  <CheckCircle className="w-10 h-10 text-primary" />
                ) : (
                  <XCircle className="w-10 h-10 text-destructive" />
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-5">
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5 font-semibold">Plant Type</p>
                <p className="font-bold text-foreground text-lg">{result.plantType}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5 font-semibold">Condition</p>
                <p className={`font-bold text-lg ${result.isHealthy ? "text-primary" : "text-destructive"}`}>
                  {result.condition}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Confidence</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${result.isHealthy ? "bg-primary" : "bg-destructive"}`}
                    />
                  </div>
                  <span className="text-sm font-bold text-foreground">{result.confidence}%</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className={`rounded-2xl p-4 ${
                result.isHealthy ? "bg-primary-light/60" : "bg-destructive/8 border border-destructive/20"
              }`}
              style={result.isHealthy ? {} : { backgroundColor: 'hsl(0 72% 51% / 0.06)' }}
            >
              <p className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
                <Leaf className={`w-4 h-4 ${result.isHealthy ? "text-primary" : "text-destructive"}`} />
                {result.isHealthy ? "Keep Your Plant Healthy" : "Recommended Actions"}
              </p>
              <ul className="space-y-1.5">
                {result.actions.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className={`mt-0.5 flex-shrink-0 ${result.isHealthy ? "text-primary" : "text-destructive"}`}>•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 px-7 py-3 rounded-xl gradient-hero text-primary-foreground font-semibold shadow-primary hover:opacity-90 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Analyze Another Image
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-7 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent hover:border-primary transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-muted/30 mt-8">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">🌿</span>
              </div>
              <div>
                <div className="font-bold text-sm text-foreground">LNCT BHOPAL</div>
                <div className="text-xs text-muted-foreground">Empowering agriculture through innovative AI solutions</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground"></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
