import { motion } from "framer-motion";
import { Leaf, Upload, Brain, CheckCircle, Cpu, Database, FlaskConical, Bug } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const steps = [
  { num: 1, icon: Upload, title: "Upload Image", desc: "Take a photo of your plant leaf showing symptoms or upload an existing image." },
  { num: 2, icon: Brain, title: "AI Analysis", desc: "Our MobileNetV2 model processes the image using deep learning algorithms." },
  { num: 3, icon: CheckCircle, title: "Get Results", desc: "Receive instant diagnosis with plant type and condition identification." },
];

const modelDetails = [
  { icon: Cpu, label: "Architecture", value: "MobileNetV2 with transfer learning" },
  { icon: Database, label: "Training Data", value: "Thousands of labeled plant images" },
  { icon: Leaf, label: "Supported Plants", value: "Apple, Tomato, Potato, Grape, Corn and more" },
  { icon: Bug, label: "Disease Coverage", value: "38+ different diseases and healthy conditions" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-14 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl font-bold text-foreground mb-3">About Our Technology</h1>
            <p className="text-muted-foreground text-lg">Transforming agriculture with artificial intelligence</p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are committed to revolutionizing plant health management through cutting-edge artificial intelligence. Our goal is to empower farmers, gardeners, and agricultural professionals with instant, accurate disease detection to protect crops and increase yields.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By making advanced AI technology accessible to everyone, we help prevent crop losses, reduce pesticide use, and promote sustainable farming practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-56 h-56 rounded-3xl bg-primary-light flex items-center justify-center shadow-card">
                <Leaf className="w-28 h-28 text-primary opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-2xl font-bold text-foreground mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-xl mb-4 shadow-primary group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <step.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Model */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-2xl font-bold text-foreground mb-8 text-center"
          >
            Our AI Model
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-card rounded-3xl border border-border p-8 shadow-card"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {modelDetails.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-0.5">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
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

export default AboutPage;
