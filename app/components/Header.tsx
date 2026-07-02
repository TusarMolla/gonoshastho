"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/app/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedHamburger from "./ui/AnimatedHamburger";
import { Sling as Hamburger } from "hamburger-react";

// Navigation links object
const navLinks = [
  { id: 1, name: "হোম", path: "/" },
  { id: 2, name: "আমাদের সম্পর্কে", path: "/about" },
  { id: 3, name: "সেবাসমূহ", path: "/services" },
  // { id: 4, name: "চিকিৎসকগণ", path: "/doctors" },
  // { id: 5, name: "ব্লগ", path: "/blog" },
  { id: 6, name: "যোগাযোগ", path: "/contact" },
];

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock effect
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-50">
            <Image
              src="/logo.png"
              alt="গণস্বাস্থ্য হোমিও"
              width={160}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.id}
                href={link.path}
                className="text-gray-800 hover:text-green-700 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Appointment Button */}
          <LinkButton
            href="/appointment"
            variant="primary"
            size="sm"
            className="hidden md:inline-flex"
          >
            Appointment
          </LinkButton>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden relative z-50 hover:bg-gray-100 text-black rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} size={20} />
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                className="fixed top-0 right-0 bottom-0 w-screen bg-white shadow-2xl z-45 flex flex-col overflow-hidden"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col h-full overflow-y-auto pt-24 pb-8">
                  {/* Navigation Links */}
                  <nav className="px-6 sm:px-8">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.id}
                        variants={itemVariants}
                        className="mb-8"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={link.path}
                          className="group flex items-center py-2 relative"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center mr-2 w-16">
                            <motion.span
                              className="absolute left-0 w-0 h-full bg-green-100 rounded-full -z-10"
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                            <span className="text-green-700/60 font-medium w-min">
                              0{link.id}
                            </span>
                            <svg
                              height="22"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line
                                x1="0"
                                y1="10"
                                x2="250"
                                y2="10"
                                className="stroke-green-700/60"
                              />
                            </svg>
                          </div>
                          <span className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                            {link.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Action Button */}
                  <motion.div
                    className="px-6 sm:px-8 mt-8"
                    variants={itemVariants}
                  >
                    <LinkButton
                      href="/appointment"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center text-lg py-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Book Appointment
                    </LinkButton>
                  </motion.div>

                  {/* Footer Section */}
                  <motion.div
                    className="mt-auto px-6 sm:px-8 pt-8 border-t border-gray-100"
                    variants={itemVariants}
                  >
                    <div className="flex space-x-4 mb-6">
                      {["facebook", "instagram", "twitter"].map(social => (
                        <motion.a
                          key={social}
                          href="#"
                          className="p-3 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="sr-only">{social}</span>
                          {social === "facebook" && (
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                          )}
                          {social === "instagram" && (
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <rect
                                width="20"
                                height="20"
                                x="2"
                                y="2"
                                rx="5"
                                ry="5"
                              />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                          )}
                          {social === "twitter" && (
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                          )}
                        </motion.a>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">
                      © {new Date().getFullYear()} গণস্বাস্থ্য হোমিও
                    </p>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute top-[20%] right-[10%] w-48 h-48 rounded-full bg-green-100/30 -z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-[30%] left-[5%] w-32 h-32 rounded-full bg-green-200/20 -z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
