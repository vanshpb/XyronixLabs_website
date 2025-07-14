"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
  useSpring,
  useInView,
  m,
} from "framer-motion";
import {
  GitlabIcon as GitHubIcon,
  LinkedinIcon as LinkedInIcon,
  TwitterIcon,
  MailIcon as EmailIcon,
  ChevronDown,
  Building2,
  Lightbulb,
  Target,
  Award,
  Moon,
  Sun,
  X,
  ArrowRight,
  ChevronUp,
  Rocket,
  Shield,
  Zap,
  Brain,
  Cpu,
  Cloud,
  Database,
  Server,
  Wifi,
  Microscope,
  Cog,
  Layers,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Tilt } from "react-tilt";
import CountUp from "react-countup";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// Dynamically import the 3D model viewer to avoid SSR issues
const ModelViewer = dynamic(() => import("@/components/model-viewerfor3"), {
  ssr: false,
});

// Import the particle animation component
import ParticleBackground from "@/components/particle-backgroundfor3";
import CircuitBackground from "@/components/circuit-backgroundfor3";
import WaveAnimation from "@/components/wave-animationfor3";
import RobotAnimation from "@/components/robot-animationfor3(fixed)";
import AIBrainAnimation from "@/components/ai-brain-animationfor3";
import NetworkAnimation from "@/components/network-animationfor3";

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState<string | null>("about");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHidden, setCursorHidden] = useState(true);

  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Parallax effect references
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Section refs for intersection observer
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    mission: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
    founders: useRef<HTMLDivElement>(null),
    values: useRef<HTMLDivElement>(null),
    research: useRef<HTMLDivElement>(null),
  };

  // Update scroll progress for progress bar
  useMotionValueEvent(smoothScrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    setShowScrollToTop(latest > 0.2);
  });

  // Toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Set initial dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");

    // Track mouse position for custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setCursorHidden(false);
    };

    // Update active section based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Check each section's position
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
        } transition-colors duration-300`}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 z-50 origin-left"
        style={{ scaleX: smoothScrollYProgress }}
      />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-purple-600 text-white shadow-lg z-40 hover:bg-purple-700 transition-colors"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 ${darkMode ? "bg-gray-900/80" : "bg-white/80"
          } backdrop-blur-md transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Rocket
              className={`h-8 w-8 ${darkMode ? "text-purple-400" : "text-purple-600"
                }`}
            />
            <span className="text-xl font-bold">Xyronix Labs</span>
          </motion.div>

          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex space-x-6"
            >
              {[
                "about",
                "mission",
                "research",
                "team",
                "founders",
                "values",
              ].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium capitalize hover:text-purple-400 transition-colors relative`}
                >
                  {section}
                  {activeSection === section && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                      layoutId="activeSection"
                    />
                  )}
                </button>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode
                ? "bg-gray-800 text-yellow-400"
                : "bg-gray-200 text-gray-700"
                } hover:bg-opacity-80 transition-colors`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax and Particles */}
      <section
        id="about"
        ref={sectionRefs.about}
        className="relative overflow-hidden pt-24 min-h-screen flex items-center"
      >
        <div
          className={`absolute inset-0 ${darkMode
            ? "bg-gradient-to-b from-purple-900/20 to-gray-950"
            : "bg-gradient-to-b from-purple-100 to-white"
            } z-0`}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {useMemo(() => {
            const circles = [...Array(20)].map((_, i) => {
              return {
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                xAnim: [0, Math.random() * 100 - 50],
                yAnim: [0, Math.random() * 100 - 50],
                duration: Math.random() * 10 + 10,
              };
            });
            return circles.map((circle, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${darkMode ? "bg-purple-600" : "bg-purple-300"
                  } opacity-20`}
                style={{
                  width: circle.width,
                  height: circle.height,
                  left: circle.left,
                  top: circle.top,
                }}
                animate={{
                  x: circle.xAnim,
                  y: circle.yAnim,
                }}
                transition={{
                  duration: circle.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ));
          }, [darkMode])}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 mb-6">
                About Xyronix Labs
              </h1>
              <p
                className={`text-xl md:text-2xl ${darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-8`}
              >
                Bridging the gap between cutting-edge technology and real-world
                applications
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 ${darkMode
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-500 hover:bg-purple-600"
                  } rounded-full font-medium transition-colors text-white flex items-center space-x-2 group`}
                onClick={() => scrollToSection("mission")}
              >
                <span>Our Mission</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 ${darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-300"
                  } rounded-full font-medium transition-colors flex items-center space-x-2`}
                onClick={() => scrollToSection("founders")}
              >
                <span>Meet Our Founders</span>
                <ChevronDown className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 ${darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-300"
                  } rounded-full font-medium transition-colors flex items-center space-x-2`}
                onClick={() => scrollToSection("team")}
              >
                <span>Meet Our Team</span>
                <ChevronDown className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"
          } transition-colors duration-300 relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <Tilt
                  key={index}
                  options={{ max: 15, scale: 1.05, speed: 300 }}
                  className={`p-6 rounded-xl ${darkMode
                    ? "bg-gray-800/80 backdrop-blur-sm"
                    : "bg-gray-100/80 backdrop-blur-sm"
                    } transition-all duration-300 border ${darkMode ? "border-purple-900/30" : "border-purple-200/30"
                    }`}
                >
                  <div className="mb-3">{stat.icon}</div>
                  <div
                    className={`text-4xl md:text-5xl font-bold mb-2 ${darkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                  >
                    {statsInView && (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <p
                    className={`text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    {stat.label}
                  </p>
                </Tilt>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section
        className={`py-20 ${darkMode ? "bg-gray-950" : "bg-gray-50"
          } transition-colors duration-300 relative overflow-hidden`}
      >
        {/* Wave Animation Background */}
        <div className="absolute inset-0 opacity-20">
          <WaveAnimation darkMode={darkMode} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Forward-Thinking Technology Company
            </h2>
            <p
              className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"
                } mb-6`}
            >
              Xyronix Labs is dedicated to innovation in AI, IoT, robotics, and
              data science. We aim to bridge the gap between cutting-edge
              technology and real-world applications, creating solutions that
              enhance lives and businesses.
            </p>
            <p
              className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"
                } mb-10`}
            >
              One of our flagship products, the Fire Early Warning and Detection
              System, ensures safety with advanced AI and IoT capabilities,
              offering early fire detection, precise localization, and efficient
              suppression.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {companyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`${darkMode
                    ? "bg-gray-800/80 hover:bg-gray-800/60"
                    : "bg-white/80 hover:bg-gray-100/80"
                    } rounded-xl p-6 transition-all duration-300 shadow-lg backdrop-blur-sm border ${darkMode ? "border-purple-900/20" : "border-purple-200/20"
                    }`}
                >
                  <div
                    className={`${darkMode ? "bg-purple-900/30" : "bg-purple-100"
                      } rounded-full p-3 w-fit mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="mission"
        ref={sectionRefs.mission}
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"
          } transition-colors duration-300 relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Mission & Vision
              </h2>
              <div
                className={`h-1 w-20 ${darkMode ? "bg-purple-500" : "bg-purple-600"
                  } mx-auto`}
              ></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              <Tilt options={{ max: 10, scale: 1.02, speed: 500 }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`${darkMode ? "bg-gray-800/80" : "bg-gray-100/80"
                    } p-8 rounded-xl border ${darkMode ? "border-gray-700/50" : "border-gray-200/50"
                    } shadow-lg transition-colors duration-300 backdrop-blur-sm`}
                >
                  <Target
                    className={`h-12 w-12 ${darkMode ? "text-purple-400" : "text-purple-600"
                      } mb-4`}
                  />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    To create impactful technologies that enhance safety,
                    efficiency, and quality of life through innovative AI and
                    IoT solutions. We strive to make advanced technology
                    accessible and practical for everyday use.
                  </p>

                  {/* Animated Mission Illustration */}
                  <motion.div
                    className="mt-6 h-40 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <RocketLaunchAnimation />
                  </motion.div>
                </motion.div>
              </Tilt>

              <Tilt options={{ max: 10, scale: 1.02, speed: 500 }}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className={`${darkMode ? "bg-gray-800/80" : "bg-gray-100/80"
                    } p-8 rounded-xl border ${darkMode ? "border-gray-700/50" : "border-gray-200/50"
                    } shadow-lg transition-colors duration-300 backdrop-blur-sm`}
                >
                  <Award
                    className={`h-12 w-12 ${darkMode ? "text-cyan-400" : "text-cyan-600"
                      } mb-4`}
                  />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    Guided by the vision of a smarter and safer tomorrow, we
                    focus on creating technologies that embody our motto,
                    "Future is Here." We envision a world where intelligent
                    systems seamlessly integrate into daily life, solving
                    complex problems with elegant solutions.
                  </p>

                  {/* Animated Vision Illustration */}
                  <motion.div
                    className="mt-6 h-40 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <FutureVisionAnimation />
                  </motion.div>
                </motion.div>
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Innovation Section */}
      <section
        id="research"
        ref={sectionRefs.research}
        className={`py-20 ${darkMode ? "bg-gray-950" : "bg-gray-50"
          } transition-colors duration-300 relative overflow-hidden text-justify p-2`}
      >
        <div className="absolute inset-0 opacity-10">
          <AIBrainAnimation darkMode={darkMode} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Research & Innovation
            </h2>
            <p
              className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"
                } max-w-3xl mx-auto`}
            >
              Pushing the boundaries of what's possible through cutting-edge
              research and development.
            </p>
            <div
              className={`h-1 w-20 ${darkMode ? "bg-purple-500" : "bg-purple-600"
                } mx-auto mt-6`}
            ></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h3 className="text-2xl font-bold mb-4">AI-Powered Solutions</h3>
              <p
                className={`${darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-6`}
              >
                Our research team develops advanced neural networks and machine
                learning algorithms that power our innovative solutions. From
                computer vision systems that detect anomalies to predictive
                analytics that anticipate maintenance needs, our AI technologies
                are at the forefront of the industry.
              </p>

              <div className="space-y-4">
                {aiCapabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-white/50"
                      } backdrop-blur-sm`}
                  >
                    <div
                      className={`p-2 rounded-full ${darkMode ? "bg-purple-900/30" : "bg-purple-100"
                        } mt-1`}
                    >
                      {capability.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{capability.title}</h4>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        {capability.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
                <AIVisualizationAnimation />
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
                <IoTNetworkAnimation />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                IoT & Robotics Integration
              </h3>
              <p
                className={`${darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-6`}
              >
                Our innovative approach combines IoT sensors with robotic
                systems to create intelligent, autonomous solutions. These
                integrated systems can monitor environments, collect data, and
                take action without human intervention, making them ideal for
                hazardous or remote locations.
              </p>

              <div className="space-y-4">
                {iotCapabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-800/50" : "bg-white/50"
                      } backdrop-blur-sm`}
                  >
                    <div
                      className={`p-2 rounded-full ${darkMode ? "bg-cyan-900/30" : "bg-cyan-100"
                        } mt-1`}
                    >
                      {capability.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{capability.title}</h4>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        {capability.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Research Projects Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Featured Research Projects
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {researchProjects.map((project, index) => (
                <Tilt
                  key={index}
                  options={{ max: 15, scale: 1.03, speed: 400 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? "bg-gray-800/70" : "bg-white/70"
                      } backdrop-blur-sm border ${darkMode ? "border-gray-700/50" : "border-gray-200/50"
                      }`}
                  >
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div
                        className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${darkMode ? "bg-purple-600/90" : "bg-purple-500/90"
                          } text-white`}
                      >
                        {project.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold mb-2">
                        {project.title}
                      </h4>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"
                          } mb-4`}
                      >
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-1 rounded-full ${darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-200 text-gray-700"
                              }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section
        id="founders"
        ref={sectionRefs.founders}
        className={`w-full py-20 ${darkMode ? "bg-gray-950" : "bg-gray-50"
          } transition-colors duration-300 relative overflow-hidden mb-6`}
      >
        <div className="absolute inset-0 opacity-10">
          <WaveAnimation darkMode={darkMode} />
        </div>

        {/* Glass background overlay */}
        <div className="absolute inset-0 z-0 bg-white/20 dark:bg-gray-900/30 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 mx-4 md:mx-12 rounded-3xl" />

        <div className="relative z-10 px-6 md:px-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Founders</h2>
            <p
              className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"
                } max-w-3xl mx-auto`}
            >
              The visionaries who established Xyronix Labs and continue to lead
              our innovation.
            </p>
            <div
              className={`h-1 w-20 ${darkMode ? "bg-purple-500" : "bg-purple-600"
                } mx-auto mt-6`}
            ></div>
          </motion.div>

          <div className="space-y-10">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`w-full p-6 rounded-xl shadow-xl border ${darkMode
                    ? "bg-gray-900 text-gray-300 border-gray-700"
                    : "bg-white text-gray-800 border-gray-200"
                  }`}
              >
                {founder.role.includes("Founder & CEO") ? (
                  <Link
                    href="https://www.xyronixlabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.h2
                      className="text-5xl md:text-7xl lg:text-9xl font-extrabold hover:text-purple-400 transition-colors inline-flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      {founder.name}
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </motion.h2>
                  </Link>
                ) : (
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold">
                    {founder.name}
                  </h2>
                )}

                <p
                  className={`mt-2 text-[40px] font-semibold ${darkMode ? "text-purple-400" : "text-purple-600"
                    }`}
                >
                  {founder.role}
                </p>


                <div className="mt-5 space-y-3 text-base md:text-lg text-justify leading-relaxed">
                  {founder.bio.map((paragraph, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <div className="mt-6 flex space-x-3">
                  {founder.social.linkedin && (
                    <motion.a
                      whileHover={{ y: -5 }}
                      href={founder.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full p-3 transition-colors ${darkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                        }`}
                    >
                      <LinkedInIcon className="h-5 w-5" />
                    </motion.a>
                  )}
                  {founder.social.github && (
                    <motion.a
                      whileHover={{ y: -5 }}
                      href={founder.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full p-3 transition-colors ${darkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                        }`}
                    >
                      <GitHubIcon className="h-5 w-5" />
                    </motion.a>
                  )}
                  {founder.social.mail && (
                    <motion.a
                      whileHover={{ y: -5 }}
                      href={founder.social.mail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full p-3 transition-colors ${darkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                        }`}
                    >
                      <EmailIcon className="h-5 w-5" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Commented out the previous founders section with images */}
      {/*
<section
  id="founders"
  ref={sectionRefs.founders}
  className={`py-20 ${darkMode ? "bg-gray-950" : "bg-gray-50"
    } transition-colors duration-300 relative overflow-hidden p-16 mb-6`}
>
  <div className="absolute inset-0 opacity-10">
    <WaveAnimation darkMode={darkMode} />
  </div>

  <div className="absolute inset-0 z-0 bg-white/20 dark:bg-gray-900/30 backdrop-blur-lg rounded-3xl border border-white/30 dark:border-gray-700/40 mx-4 md:mx-12" />

  <div className="container mx-auto px-12 relative z-10 text-justify">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Our Founders
      </h2>
      <p
        className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"
          } max-w-3xl mx-auto`}
      >
        The visionaries who established Xyronix Labs and continue to lead
        our innovation.
      </p>
      <div
        className={`h-1 w-20 ${darkMode ? "bg-purple-500" : "bg-purple-600"
          } mx-auto mt-6`}
      ></div>
    </motion.div>

    <div className="space-y-20">
      {founders.map((founder, index) => (
        <motion.div
          key={founder.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`grid md:grid-cols-2 gap-2 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
        >
          <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
            <Tilt options={{ max: 15, scale: 1.03, speed: 400 }}>
              <div
                className={`overflow-hidden rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-200"
                  } aspect-square shadow-xl w-56 md:w-96 mx-auto`}
              >
                {founder.role.includes("Founder & CEO") ? (
                  <Link
                    href="https://www.xyronixlabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative group">
                      <Image
                        src={
                          founder.image ||
                          "/placeholder.svg?height=300&width=300"
                        }
                        alt={founder.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 dark:bg-gray-900/90 px-4 py-2 rounded-lg">
                          <p className="text-sm font-medium">
                            Visit Profile
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Image
                    src={
                      founder.image ||
                      "/placeholder.svg?height=300&width=300"
                    }
                    alt={founder.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
            </Tilt>
          </div>
          <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
            {founder.role.includes("Founder & CEO") ? (
              <Link
                href="https://www.xyronixlabs.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.h2
                  className={`text-3xl font-bold hover:text-purple-400 transition-colors inline-flex items-center`}
                  whileHover={{ x: 5 }}
                >
                  {founder.name}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.h2>
              </Link>
            ) : (
              <h2 className="text-3xl font-bold">{founder.name}</h2>
            )}
            <p
              className={`mt-2 text-xl font-medium ${darkMode ? "text-purple-400" : "text-purple-600"
                }`}
            >
              {founder.role}
            </p>
            <div
              className={`mt-6 space-y-4 ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              {founder.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <div className="mt-8 flex space-x-4">
              {founder.social.linkedin && (
                <motion.a
                  whileHover={{ y: -5 }}
                  href={founder.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full ${darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                    } p-3 transition-colors`}
                  aria-label={`${founder.name}'s LinkedIn profile`}
                >
                  <LinkedInIcon className="h-5 w-5" />
                </motion.a>
              )}
              {founder.social.twitter && (
                <motion.a
                  whileHover={{ y: -5 }}
                  href={founder.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full ${darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                    } p-3 transition-colors`}
                  aria-label={`${founder.name}'s Twitter profile`}
                >
                  <TwitterIcon className="h-5 w-5" />
                </motion.a>
              )}
              {founder.social.github && (
                <motion.a
                  whileHover={{ y: -5 }}
                  href={founder.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full ${darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                    } p-3 transition-colors`}
                  aria-label={`${founder.name}'s GitHub profile`}
                >
                  <GitHubIcon className="h-5 w-5" />
                </motion.a>
              )}
              {founder.social.mail && (
                <motion.a
                  whileHover={{ y: -5 }}
                  href={founder.social.mail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full ${darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                    } p-3 transition-colors`}
                  aria-label={`${founder.name}'s email`}
                >
                  <EmailIcon className="h-5 w-5" />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
*/}

      {/* Team Section */}
      <section
        id="team"
        ref={sectionRefs.team}
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"
          } transition-colors duration-300 relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition duration-300 rounded px-2 inline-block ${darkMode
                  ? "hover:bg-purple-800/20"
                  : "hover:bg-purple-600"
                }`}
            >
              Meet Our Team
            </h2>


            <p
              className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"} max-w-3xl mx-auto`}
            >
              The brilliant minds behind Xyronix Labs who are dedicated to innovation and excellence.
            </p>

            <div
              className={`h-1 w-20 hover:w-full transition-all duration-300 ${darkMode ? "bg-purple-500" : "bg-purple-600"
                } mx-auto mt-6`}
            ></div>
          </motion.div>


          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
                isFounder={member.role.includes("Founder & CEO")}
                darkMode={darkMode}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        id="values"
        ref={sectionRefs.values}
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"
          } transition-colors duration-300 relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p
              className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"
                } max-w-3xl mx-auto`}
            >
              The principles that guide our work and define our culture.
            </p>
            <div
              className={`h-1 w-20 ${darkMode ? "bg-purple-500" : "bg-purple-600"
                } mx-auto mt-6`}
            ></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`${darkMode
                  ? "bg-gray-800/80 hover:bg-gray-800/60"
                  : "bg-white/80 hover:bg-gray-100/80"
                  } p-6 rounded-xl transition-all shadow-lg border ${darkMode ? "border-gray-700/50" : "border-gray-200/50"
                  } backdrop-blur-sm`}
              >
                <div
                  className={`${darkMode ? "bg-purple-900/30" : "bg-purple-100"
                    } rounded-full p-3 w-fit mb-4`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        className={`py-20 ${darkMode ? "bg-gray-950" : "bg-gray-50"
          } transition-colors duration-300 relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p
              className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"
                } max-w-3xl mx-auto`}
            >
              The milestones that have shaped our path to innovation.
            </p>
            <div
              className={`h-1 w-20 ${darkMode ? "bg-purple-500" : "bg-purple-600"
                } mx-auto mt-6`}
            ></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row mb-12 relative"
              >
                {/* Timeline line */}
                {index < timeline.length - 1 && (
                  <div
                    className={`absolute left-4 md:left-1/2 top-16 bottom-0 w-0.5 ${darkMode ? "bg-gray-700" : "bg-gray-300"
                      } md:-translate-x-1/2`}
                  ></div>
                )}

                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-1/2 top-6 w-8 h-8 rounded-full ${darkMode ? "bg-purple-600" : "bg-purple-500"
                    } flex items-center justify-center md:-translate-x-1/2 z-10`}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${darkMode ? "bg-gray-900" : "bg-white"
                      }`}
                  ></div>
                </div>

                <div
                  className={`md:w-1/2 ${index % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:pl-12 md:ml-auto"
                    } pl-16 md:pl-0`}
                >
                  <div
                    className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800/80" : "bg-gray-100/80"
                      } backdrop-blur-sm`}
                  >
                    <div
                      className={`text-sm font-semibold ${darkMode ? "text-purple-400" : "text-purple-600"
                        } mb-2`}
                    >
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p
                      className={`${darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative max-w-3xl w-full ${darkMode ? "bg-gray-900" : "bg-white"
                } rounded-2xl shadow-2xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
                onClick={() => setSelectedMember(null)}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="p-6 md:p-8 flex flex-col">
                <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
                <p
                  className={`${darkMode ? "text-purple-400" : "text-purple-600"
                    } text-lg mb-4`}
                >
                  {selectedMember.role}
                </p>

                <div
                  className={`flex-grow overflow-y-auto ${darkMode ? "text-gray-300" : "text-gray-700"
                    } space-y-4 pr-2`}
                >
                  <div
                    className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                  >
                    <h4 className="font-semibold mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise?.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-sm ${darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-800"
                            }`}
                        >
                          {skill}
                        </span>
                      )) ||
                        [
                          "AI",
                          "IoT",
                          "Robotics",
                          "Data Science",
                          "Cloud Computing",
                        ].map((skill, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-sm ${darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-200 text-gray-800"
                              }`}
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  {selectedMember.social.linkedin && (
                    <a
                      href={selectedMember.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full ${darkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                        } p-2 transition-colors`}
                      aria-label={`${selectedMember.name}'s LinkedIn profile`}
                    >
                      <LinkedInIcon className="h-5 w-5" />
                    </a>
                  )}
                  {selectedMember.social.github && (
                    <a
                      href={selectedMember.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full ${darkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                        } p-2 transition-colors`}
                      aria-label={`${selectedMember.name}'s GitHub profile`}
                    >
                      <GitHubIcon className="h-5 w-5" />
                    </a>
                  )}
                  {selectedMember.social.mail && (
                    <a
                      href={selectedMember.social.mail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full ${darkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white"
                        } p-2 transition-colors`}
                      aria-label={`${selectedMember.name}'s email`}
                    >
                      <EmailIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Team Member Card Component with hover effects
function TeamMemberCard({
  member,
  index,
  isFounder,
  darkMode,
  onClick,
}: {
  member: (typeof teamMembers)[0];
  index: number;
  isFounder: boolean;
  darkMode: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl w-full h-40 p-4 flex flex-col justify-center items-center text-center
        ${darkMode ? "bg-gray-800/80 border-gray-700/50" : "bg-white/80 border-gray-200/50"}
        group shadow-lg cursor-pointer backdrop-blur-sm border`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="z-10">
        {isFounder ? (
          <Link
            href="https://www.xyronixlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold hover:text-purple-400 transition-colors flex items-center justify-center">
              {member.name}
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>
        ) : (
          <h3 className="text-xl font-bold">{member.name}</h3>
        )}
        <p className={`${darkMode ? "text-purple-400" : "text-purple-600"} mt-1`}>
          {member.role}
        </p>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/90 p-4 flex flex-col justify-end items-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* <h3 className="text-xl font-bold text-white">{member.name}</h3> */}
        <p className="text-purple-400 mb-2">{member.role}</p>

        <div className="flex space-x-3">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full bg-gray-700 p-2 text-gray-300 hover:bg-purple-600 hover:text-white transition-colors"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          )}
          {member.social.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full bg-gray-700 p-2 text-gray-300 hover:bg-purple-600 hover:text-white transition-colors"
              aria-label={`${member.name}'s GitHub profile`}
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          )}
          {member.social.mail && (
            <a
              href={member.social.mail}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full bg-gray-700 p-2 text-gray-300 hover:bg-purple-600 hover:text-white transition-colors"
              aria-label={`${member.name}'s email`}
            >
              <EmailIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          View Profile
        </motion.button>
      </motion.div>
    </motion.div>
  );
}


// Animation Components
function RocketLaunchAnimation() {
  return (
    <motion.div className="relative w-full h-full">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Rocket className="h-16 w-16 text-purple-500" />
        <motion.div
          initial={{ opacity: 0.5, y: 20, scale: 0.8 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            y: [20, 30, 20],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-orange-500/50 blur-md"
        />
      </motion.div>

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}

function FutureVisionAnimation() {
  return (
    <motion.div className="relative w-full h-full">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Brain className="h-16 w-16 text-cyan-500" />
        <motion.div
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
        />
        <motion.div
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
        />
      </motion.div>

      {/* Connection lines */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x = Math.cos(angle) * 60;
        const y = Math.sin(angle) * 60;

        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              x: x,
              y: y,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </motion.div>
  );
}

function AIVisualizationAnimation() {
  // Precompute the neural node properties once.
  const neuralNodes = useMemo(() => {
    return [...Array(30)].map(() => ({
      width: Math.random() * 6 + 4,
      height: Math.random() * 6 + 4,
      left: Math.random() * 80 + 10, // percentage
      top: Math.random() * 80 + 10, // percentage
      scaleAnim: [1, 1.2, 1],
      opacityAnim: [0.4, 0.8, 0.4],
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl overflow-hidden flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full"
      >
        {/* Neural network nodes */}
        {neuralNodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500"
            style={{
              width: node.width,
              height: node.height,
              left: `${node.left}%`,
              top: `${node.top}%`,
            }}
            animate={{
              scale: node.scaleAnim,
              opacity: node.opacityAnim,
            }}
            transition={{
              repeat: Infinity,
              duration: node.duration,
              delay: node.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Neural network connections */}
        <svg className="absolute inset-0 w-full h-full">
          {useMemo(() => {
            return [...Array(40)].map((_, i) => {
              const x1 = Math.random() * 100;
              const y1 = Math.random() * 100;
              const x2 = Math.random() * 100;
              const y2 = Math.random() * 100;
              const duration = Math.random() * 4 + 3;
              const delay = Math.random() * 2;
              return (
                <motion.line
                  key={i}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="rgba(168, 85, 247, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration,
                    delay,
                  }}
                />
              );
            });
          }, [])}
        </svg>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Brain className="h-24 w-24 text-purple-400/80" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function IoTNetworkAnimation() {
  // Precompute IoT devices.
  const iotDevices = useMemo(() => {
    return [...Array(12)].map((_, i) => {
      const icons = [
        { icon: <Cpu className="h-6 w-6 text-cyan-400" />, key: "cpu" },
        { icon: <Wifi className="h-6 w-6 text-cyan-400" />, key: "wifi" },
        { icon: <Server className="h-6 w-6 text-cyan-400" />, key: "server" },
        {
          icon: <Database className="h-6 w-6 text-cyan-400" />,
          key: "database",
        },
        { icon: <Cloud className="h-6 w-6 text-cyan-400" />, key: "cloud" },
      ];
      const chosen = icons[i % icons.length];
      return {
        left: Math.random() * 80 + 10,
        top: Math.random() * 80 + 10,
        yAnim: [0, Math.random() * 10 - 5, 0],
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 2,
        icon: chosen.icon,
      };
    });
  }, []);

  // Precompute IoT connections.
  const iotConnections = useMemo(() => {
    return [...Array(20)].map((_, i) => {
      const x1 = Math.random() * 100;
      const y1 = Math.random() * 100;
      const x2 = Math.random() * 100;
      const y2 = Math.random() * 100;
      return {
        key: i,
        x1: `${x1}%`,
        y1: `${y1}%`,
        x2: `${x2}%`,
        y2: `${y2}%`,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      };
    });
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl overflow-hidden flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full"
      >
        {/* IoT devices */}
        {iotDevices.map((device, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg bg-gray-800/80 p-2"
            style={{
              left: `${device.left}%`,
              top: `${device.top}%`,
            }}
            animate={{
              y: device.yAnim,
            }}
            transition={{
              repeat: Infinity,
              duration: device.duration,
              delay: device.delay,
            }}
          >
            {device.icon}
          </motion.div>
        ))}

        {/* IoT connections */}
        <svg className="absolute inset-0 w-full h-full">
          {iotConnections.map((conn) => (
            <motion.line
              key={conn.key}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="rgba(34, 211, 238, 0.2)"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: conn.duration,
                delay: conn.delay,
              }}
            />
          ))}
        </svg>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Cloud className="h-24 w-24 text-cyan-400/80" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Data
const founders = [
  {
    id: 1,
    name: "Aditya Seth",
    role: "Founder & Chief Executive Officer",
    image: "/Employees/Me.jpg",
    bio: [
      "Aditya is a tech entrepreneur and innovator, specializing in AI, IoT, Robotics, and Networking. As the Founder & CEO of Xyronix Labs, he leads cutting-edge research and development in the Internet of Robotic Things (IoRT).",
      "He also serves as the Deputy CEO at Business Press India, COO at Shambhavi Techno Consultancy, and COO at Novatech Scientifics & Informatics. His leadership spans multiple industries, focusing on AI-driven automation, backend systems, and software engineering.",
      "With expertise in building AI-powered solutions, Aditya has developed innovations such as a Fire Early Warning and Supression System. He is passionate about driving technological advancements to enhance safety, efficiency, and innovation.",
    ],
    social: {
      linkedin: "https://linkedin.com/in/adityaseth936",
      twitter: null,
      github: "https://github.com/adityaseth0905",
      mail: "mailto:founder@xyronixlabs.com",
    },
    expertise: [
      "AI",
      "IoT",
      "Robotics",
      "Cloud Computing",
      "System Architecture",
    ],
  },
  {
    id: 2,
    name: "Hemaang Mehra",
    role: "Co-Founder & Chief Operations Officer",
    image: "/Employees/Hema.jpg",
    bio: [
      "Hemaang brings deep technical expertise and innovative thinking to our company. With a background in Electronics and Communication Engineering with specialization in artificial intelligence, he leads our company's operations.",
      "His passion for technology and problem-solving has been instrumental in building our platform from the ground up.",
    ],
    social: {
      linkedin: "https://linkedin.com/in/hemaang-mehra",
      twitter: null,
      github: null,
      mail: "mailto:co-founder@xyronixlabs.com",
    },
    expertise: [
      "Operations",
      "Electronics",
      "AI",
      "Product Development",
      "Team Leadership",
    ],
  },
  {
    id: 3,
    name: "Dr. Sanjeev Seth",
    role: "Chief Advisor",
    image: "/Employees/sanjeev seth.jpg",
    bio: [
      "Dr. Sanjeev Seth is a seasoned professional with over 30 years of experience in diverse industries & has served  Pharmaceutical, Health Care, Hospitality, Real Estate & Academic Industry in various capacities from R & D, Brand Promotion, Quality Analyst & Freelance Auditor for Industry & Academia.",
    ],
    social: {
      linkedin: "https://linkedin.com/in/sanjeevseth",
      twitter: null,
      github: null,
      mail: "mailto:sanjeev@xyronixlabs.com",
    },
    expertise: [
      "Advising",
      "Consultancy",
      "NAAC",
      "NABL",
      "QS",
      "JCC",
      "ISO",
      "Audits",
      "NABH",
      "NIRF",
    ],
  },
];

const teamMembers = [
  //update this pls
  {
    id: 1,
    name: "Darashveer Singh Dhillon",
    role: "General Manager",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/darashveersinghdhillon",
      github: null,
      mail: "mailto:darashveer@xyronixlabs.com",
    },
    expertise: [
      "Research",
      "Data Analytics",
      "Data Science",
      "Machine Learning",
    ],
  },
  //update this pls
  //make email
  {
    id: 2,
    name: "Priyanshu Chauhan",
    role: "General Manager",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/priyanshu-chauhan-9ab9ac9",
      github: "https://github.com/Anshuchauahan",
      mail: "mailto:priyanshu@xyronixlabs.com",
    },
    expertise: ["SDE", "Research", "CSE", "Automation", "Cyber Security"],
  },
  //update this pls
  {
    id: 3,
    name: "Shubhankar Shukla",
    role: "General Manager",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/shubhankar-shukla-b88a86336",
      github: "https://www.github.com/Shubhankar003",
      mail: "mailto:shubhankar@xyronixlabs.com",
    },
    expertise: ["Robotics", "ECE", "Research", "Automation"],
  },
  //update this pls
  {
    id: 4,
    name: "Devashish Biswas",
    role: "Team Lead -Development Department (D1)",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/devashish-biswas-82b83a279",
      github: "https://www.github.com/dbiswas2004",
      mail: "mailto:devashish@xyronixlabs.com",
    },
    expertise: ["Robotics", "SDE", "Research", "CSE"],
  },
  //update this pls
  //make email
  {
    id: 5,
    name: "Yash Tomar",
    role: "Team Lead -Content Department (C1)",
    image: "",
    social: {
      linkedin: "https://www.linkedin.com/in/yash-te-e/",
      github: null,
      mail: "mailto:yash@xyronixlabs.com",
    },
    expertise: ["Robotics", "SDE", "Research", "CSE"],
  },
  {
    id: 6,
    name: "Pragya Jha",
    role: "D1 Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/pragya-jha-a6b328250",
      github: "https://www.github.com/Pragya3104",
      mail: "mailto:pragya@xyronixlabs.com",
    },
    expertise: ["Python", "Data Science", "Backend", "Research", "Automation"],
  },
  {
    id: 7,
    name: "Yatharth Vashishth",
    role: "D1 Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/yatharth-vashisht-1b3546310",
      github: "https://www.github.com/Yatharth48",
      mail: "mailto:yatharth@xyronixlabs.com",
    },
    expertise: ["Python", "Data Science", "Backend", "Research", "Automation"],
  },
  //update this pls
  //make email
  {
    id: 8,
    name: "Soumendra Narayan Roy",
    role: "Research Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/soumendra-narayan-roy-128135359",
      github: null,
      mail: "mailto:soumendra@xyronixlabs.com",
    },
    expertise: ["Robotics", "ECE", "Research", "Automation"],
  },
  //update this pls
  //make email
  {
    id: 9,
    name: "Shashank Kumar Lal",
    role: "D1 Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/shashank-kumar-lal-746b41364",
      github: "https://github.com/Shashank-0910",
      mail: "mailto:shashank@xyronixlabs.com",
    },
    expertise: ["SDE", "Research", "CSE", "Automation"],
  },
  //make email
  {
    id: 10,
    name: "Dev Raj Santhaliya",
    role: "Designining Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/devrajsanthaliya",
      github: "https://github.com/okeidevv",
      mail: "mailto:devraj@xyronixlabs.com",
    },
    expertise: ["SDE", "Research", "CSE", "Automation"],
  },
  //make email
  {
    id: 11,
    name: "Sankalp Tiwari",
    role: "Content Writer",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/sankalp-tiwari-414791358",
      github: null,
      mail: "mailto:sankalp@xyronixlabs.com",
    },
    expertise: ["Content Writting", "Content Creation", "ECE"],
  },
  //make email
  {
    id: 12,
    name: "Darsh Solanki",
    role: "D1 Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/darsh-solanki-55a9b7222",
      github: "https://github.com/darsh0124",
      mail: "mailto:darsh@xyronixlabs.com",
    },
    expertise: ["SDE", "Research", "CSE"],
  },
  //update this pls
  //make email
  {
    id: 13,
    name: "Ayush Singh",
    role: "Research Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/ayush-singh-a36969358",
      github: "https://github.com/Ayushsingh0053",
      mail: "mailto:ayush@xyronixlabs.com",
    },
    expertise: ["EEE", "Research", "Automation"],
  },
  //update this pls
  //make email
  {
    id: 14,
    name: "Ronit Jatasra",
    role: "D1 Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/ronit-jatasra-120b4134a",
      github: "https://github.com/Ronit092",
      mail: "mailto:ronit@xyronixlabs.com",
    },
    expertise: ["SDE", "Research", "CSE"],
  },
  //update this pls
  //make email
  {
    id: 15,
    name: "Ananya Das",
    role: "Research Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/ananya-das-185308308",
      github: null,
      mail: "mailto:ananya@xyronixlabs.com",
    },
    expertise: [
      "Research",
      "Data Analytics",
      "Data Science",
      "Machine Learning",
    ],
  },
  //update this pls
  //make email
  {
    id: 16,
    name: "Anshuman Prashar",
    role: "D1 Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/anshuman-parashar-8240b6254",
      github: null,
      mail: "mailto:anshuman@xyronixlabs.com",
    },
    expertise: ["Robotics", "SDE", "Research", "CSE"],
  },
  //make email
  {
    id: 17,
    name: "K SABARI KUMAR",
    role: "Research Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/sabari-kumar-601791358/",
      github: "https://www.github.com/Sabari569",
      mail: "mailto:sabari@xyronixlabs.com",
    },
    expertise: ["Robotics", "ECE", "Research"],
  },
  //update this pls
  //make email
  {
    id: 18,
    name: "Vansh Sethi",
    role: "D1 Team",
    image: "",
    social: {
      linkedin: "https://linkedin.com/in/vansh-sethi-b977a2276",
      github: "https://www.github.com/vanshpb",
      mail: "mailto:vansh@xyronixlabs.com",
    },
    expertise: ["SDE", "Research", "CSE"],
  },
  //put this in Ex Employees
  // {
  //   id: 19,
  //   name: "Drishti Arora",
  //   role: "Ex Research Team",
  //   image: "/Employees/Drishti_arora.jpg",
  //   social: {
  //     linkedin: "https://linkedin.com/in/drishti-arora-b4a39b257",
  //     github: null,
  //     mail: "mailto:drishti@xyronixlabs.com",
  //   },
  //   expertise: ["Robotics", "IoRT", "Research", "Automation"],
  // },
  //Put this in Ex Employees
  // {
  //   id: 20,
  //   name: "Raghav Nanda",
  //   role: "Designing Team",
  //   image: "",
  //   social: {
  //     linkedin: "https://linkedin.com/in/raghav-nanda-026104248",
  //     github: null,
  //     mail: "mailto:raghav@xyronixlabs.com",
  //   },
  //   expertise: ["Graphic Designing", "Social Media Campaign"],
  // },
  //Put this in Ex Employees
  // {
  //  id: 21,
  //  name: "Saumya Omer",
  //  role: "Ex Designing Team",
  //  image: "/Employees/Saumya Omer.jpg",
  //  social: {
  //    linkedin: "https://linkedin.com/in/saumya-omer-550539310",
  //    github: null,
  //    mail: "mailto:saumya@xyronixlabs.com",
  //  },
  //  expertise: ["Branding", "Illustration", "Icons & Logo Design", "Motion Graphics"],
  //  },
];

const coreValues = [
  {
    title: "Innovation",
    description:
      "We constantly push boundaries to create solutions that have never existed before.",
    icon: <Lightbulb className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Excellence",
    description:
      "We strive for the highest quality in everything we create and deliver.",
    icon: <Award className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Integrity",
    description:
      "We operate with honesty, transparency, and ethical standards in all our endeavors.",
    icon: <Shield className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Impact",
    description:
      "We measure our success by the positive difference our technology makes in the world.",
    icon: <Target className="h-6 w-6 text-purple-400" />,
  },
];

const companyFeatures = [
  {
    title: "Scalable Solutions",
    description:
      "Our scalable and reliable solutions cater to diverse industries, including residential, commercial, and industrial sectors.",
    icon: <Building2 className="h-10 w-10 text-purple-400" />,
  },
  {
    title: "Intelligent Systems",
    description:
      "By leveraging intelligent systems powered by neural networks and robust cloud-based platforms, we drive efficiency, safety, and sustainable growth.",
    icon: <Brain className="h-10 w-10 text-cyan-400" />,
  },
  {
    title: "Rapid Innovation",
    description:
      "Our agile development approach allows us to quickly adapt to changing needs and emerging technologies.",
    icon: <Zap className="h-10 w-10 text-yellow-400" />,
  },
  {
    title: "Secure Infrastructure",
    description:
      "We prioritize security in all our solutions, ensuring data protection and system integrity.",
    icon: <Shield className="h-10 w-10 text-green-400" />,
  },
];

const stats = [
  {
    value: 6,
    label: "Team Members",
    suffix: "",
    icon: (
      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-purple-900/30">
        <Users className="h-6 w-6 text-purple-400" />
      </div>
    ),
  },
  {
    value: 3,
    label: "Projects Completed",
    suffix: "+",
    icon: (
      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-cyan-900/30">
        <CheckCircle className="h-6 w-6 text-cyan-400" />
      </div>
    ),
  },
  {
    value: 8,
    label: "Working Domains",
    suffix: "+",
    icon: (
      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30">
        <Globe className="h-6 w-6 text-blue-400" />
      </div>
    ),
  },
  {
    value: 98,
    label: "Client Satisfaction",
    suffix: "%",
    icon: (
      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-green-900/30">
        <ThumbsUp className="h-6 w-6 text-green-400" />
      </div>
    ),
  },
];

const timeline = [
  {
    year: "2024",
    month: "November",
    title: "Foundation",
    description:
      "Xyronix Labs was founded with a vision to create innovative solutions in Internet of Robotic Things (IoRT).",
  },
  {
    year: "2024",
    month: "December",
    title: "Foundation of Founding Team",
    description: "Xyronix Labs was founding team was established.",
  },
  {
    year: "2025",
    month: "January",
    title: "First Product Idea",
    description:
      "Proposed our first AI-powered fire early detection and supression system, establishing our presence in the safety tech market.",
  },
  {
    year: "2025",
    month: "February",
    title: "Networking",
    description:
      "Networked with some organizations, Founders, CEOs and potential clientbase for recognition.",
  },
  {
    year: "2025",
    month: "March",
    title: "Hiring",
    description: "Hired some Interns for Design Team & Social Media Handling.",
  },
  {
    year: "2025",
    month: "March",
    title: "Contributions & Events",
    description:
      "Made contributions and participated in AASGON & Business Press India Presents Indo-African Scholarships Launch Event.",
  },
];

const aiCapabilities = [
  {
    title: "Computer Vision",
    description:
      "Advanced object detection and recognition for real-time monitoring and analysis",
    icon: <Eye className="h-4 w-4 text-purple-400" />,
  },
  {
    title: "Predictive Analytics",
    description:
      "Forecasting potential issues before they occur using historical and real-time data",
    icon: <BarChart3 className="h-4 w-4 text-purple-400" />,
  },
  {
    title: "Natural Language Processing",
    description:
      "Understanding and processing human language for intuitive user interfaces",
    icon: <MessageSquare className="h-4 w-4 text-purple-400" />,
  },
  {
    title: "Deep Learning",
    description:
      "Multi-layered neural networks that continuously improve with more data",
    icon: <Layers className="h-4 w-4 text-purple-400" />,
  },
];

const iotCapabilities = [
  {
    title: "Sensor Networks",
    description:
      "Distributed networks of sensors for comprehensive environmental monitoring",
    icon: <Wifi className="h-4 w-4 text-cyan-400" />,
  },
  {
    title: "Edge Computing",
    description:
      "Processing data at the source to reduce latency and bandwidth usage",
    icon: <Cpu className="h-4 w-4 text-cyan-400" />,
  },
  {
    title: "Autonomous Systems",
    description:
      "Self-operating robotic systems that can navigate and perform tasks independently",
    icon: <Cog className="h-4 w-4 text-cyan-400" />,
  },
  {
    title: "Real-time Monitoring",
    description:
      "Continuous data collection and analysis for immediate response capabilities",
    icon: <Activity className="h-4 w-4 text-cyan-400" />,
  },
];

const researchProjects = [
  {
    title: "Neural Fire Detection",
    description:
      "Advanced neural network for early fire detection with 99.8% accuracy and minimal false positives",
    image: "/placeholder.svg?height=300&width=400",
    category: "AI",
    technologies: [
      "TensorFlow",
      "Computer Vision",
      "Thermal Imaging",
      "Edge AI",
    ],
  },
  {
    title: "Autonomous Response Robots",
    description:
      "Self-navigating robots that can locate and suppress fires in complex environments",
    image: "/placeholder.svg?height=300&width=400",
    category: "Robotics",
    technologies: ["ROS", "SLAM", "Autonomous Navigation", "Computer Vision"],
  },
  {
    title: "IoT Sensor Mesh",
    description:
      "Low-power, high-reliability sensor network with mesh topology for comprehensive coverage",
    image: "/placeholder.svg?height=300&width=400",
    category: "IoT",
    technologies: ["LoRaWAN", "MQTT", "Energy Harvesting", "Mesh Networking"],
  },
];

// Import missing components
import {
  Users,
  CheckCircle,
  Globe,
  ThumbsUp,
  Eye,
  MessageSquare,
  Activity,
} from "lucide-react";
