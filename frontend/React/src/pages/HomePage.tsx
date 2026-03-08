import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Target, MousePointer, ArrowRight, Upload } from "lucide-react";
import heroPlant from "@/assets/hero-plant.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stats = [
  { value: "38+", label: "Plant Diseases" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "10+", label: "Plant Species" },
  { value: "24/7", label: "Available" },
];

const features = [
  {
    icon: Zap,
    title: "Instant Detection",
    desc: "Get results in seconds with our advanced AI model trained on thousands of plant images.",
  },
  {
    icon: Target,
    title: "High Accuracy",
    desc: "Powered by MobileNetV2 architecture for precise disease identification across multiple plant species.",
  },
  {
    icon: MousePointer,
    title: "Easy to Use",
    desc: "Simple interface — just upload a photo and get instant diagnosis. No technical knowledge required.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="text-foreground">AI-Powered</span>
              <br />
              <span className="text-gradient">Plant Disease</span>
              <br />
              <span className="text-foreground">Detection</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Protect your crops with cutting-edge artificial intelligence. Instant disease identification for healthier plants and better yields.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/upload"
                className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-hero text-primary-foreground font-semibold shadow-primary hover:opacity-90 transition-all active:scale-95"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-accent hover:border-primary transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-primary ring-1 ring-border">
              <img src={heroPlant} alt="Healthy plant leaves" className="w-full h-72 object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-xl gradient-hero opacity-20 blur-xl" />
            <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-primary-light opacity-60 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12"
          >
            Why Choose PlantCare AI?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:border-primary/40 hover:shadow-primary transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-4xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-muted-foreground text-sm font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="gradient-cta rounded-3xl p-12 text-center shadow-primary"
          >
            <h2 className="text-3xl font-bold text-primary-foreground mb-3">
              Ready to Protect Your Plants?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Start detecting plant diseases now with our AI-powered system
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground text-primary rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-muted/30">
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

export default HomePage;
