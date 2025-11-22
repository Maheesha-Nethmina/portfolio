import React, { useState, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const formRef = useRef();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSubmitStatus(null);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // ---  EMAILJS KEYS ---
    emailjs
      .sendForm(
        'service_87eld4o', 
        'template_0khgj7p', 
        formRef.current, 
        { publicKey: 'KKsUT_y4irOhMze3k' }
      )
      .then(
        () => {
          setIsSending(false);
          setSubmitStatus('success');
          e.target.reset();
          setTimeout(() => {
            setIsModalOpen(false);
            setSubmitStatus(null);
          }, 3000);
        },
        (error) => {
          setIsSending(false);
          setSubmitStatus('error');
          console.error('FAILED...', error.text);
        }
      );
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative z-10">
      <SectionHeader title="Get In Touch" />
      
      {/* --- MAIN CONTACT CONTENT --- */}
      <motion.div 
        className="text-center max-w-2xl mx-auto px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-base sm:text-lg text-slate-600 mb-8">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
          my inbox is always open!
        </p>
        
        <button 
          onClick={toggleModal}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold 
                     text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-lg 
                     hover:bg-indigo-700 transition-all duration-300
                     transform hover:scale-105 cursor-pointer active:scale-95"
        >
          Say Hello <FaPaperPlane className="text-xs sm:text-sm" />
        </button>

        {/* Social Icons Grid - Responsive spacing */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-12">
          {[
            { href: "https://github.com/Maheesha-Nethmina", icon: <FaGithub size={28} />, label: "GitHub" },
            { href: "https://linkedin.com/in/maheesha-nethmina/", icon: <FaLinkedin size={28} />, label: "LinkedIn" },
            { href: "https://wa.me/94712918346", icon: <FaWhatsapp size={28} />, label: "WhatsApp" },
            { href: "mailto:maheeshanethmina@gmail.com", icon: <FaEnvelope size={28} />, label: "Email" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-indigo-600 transition-colors"
              whileHover={{ scale: 1.2, y: -5 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* --- RESPONSIVE MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
            
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              // Responsive classes: w-[95%] for mobile, max-h-[90vh] for scrolling
              className="bg-white w-[95%] max-w-lg rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Header - Sticky at top */}
              <div className="bg-slate-50 px-4 sm:px-6 py-4 border-b border-slate-100 flex justify-between items-center flex-shrink-0 rounded-t-2xl">
                <h3 className="text-slate-900 text-lg sm:text-xl font-bold">Send a Message</h3>
                <button 
                  onClick={toggleModal} 
                  className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Form - Scrollable Body */}
              <div className="overflow-y-auto custom-scrollbar p-4 sm:p-6">
                <form ref={formRef} onSubmit={sendEmail} className="space-y-4 sm:space-y-5">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1 sm:mb-2">Name</label>
                    <input 
                      type="text" 
                      name="user_name" 
                      required 
                      // text-base prevents iOS zoom
                      className="w-full p-3 text-base bg-slate-50 border border-slate-200 rounded-lg text-slate-900 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                 transition-all duration-200 placeholder:text-slate-400"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1 sm:mb-2">Email</label>
                    <input 
                      type="email" 
                      name="user_email" 
                      required 
                      className="w-full p-3 text-base bg-slate-50 border border-slate-200 rounded-lg text-slate-900 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                 transition-all duration-200 placeholder:text-slate-400"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1 sm:mb-2">Message</label>
                    <textarea 
                      name="message" 
                      required 
                      rows="4"
                      className="w-full p-3 text-base bg-slate-50 border border-slate-200 rounded-lg text-slate-900 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                 resize-none transition-all duration-200 placeholder:text-slate-400"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSending}
                    className={`w-full flex items-center justify-center py-3 sm:py-4 rounded-lg font-bold text-lg text-white shadow-lg 
                      transform transition-all duration-300
                      ${isSending 
                        ? 'bg-slate-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95'
                      }`}
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-50 text-green-700 rounded-lg text-center text-sm font-medium border border-green-100"
                    >
                      ✅ Message sent successfully!
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 text-red-700 rounded-lg text-center text-sm font-medium border border-red-100"
                    >
                      ❌ Failed to send. Please check your connection.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;