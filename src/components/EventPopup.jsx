import React, { useState, useEffect } from 'react';

const EventPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Event Configuration - Easy to customize
  const eventConfig = {
    image: "/allPhotos/event.webp", // Change this to your event image
    title: "",
    subtitle: "",
    whatsappNumber: "919204057290",
    whatsappMessage: "I'm interested in the event",
    showDelay: 3000, // Show after 3 seconds
    showOnEveryVisit: false, // Set to true to show on every visit, false for once per session
  };

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('eventPopupShown');
    
    if (!popupShown) {
      // Show popup after configured delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, eventConfig.showDelay);

      return () => clearTimeout(timer);
    }
  }, [eventConfig.showDelay]);

  const handleClose = () => {
    setIsClosing(true);
    // Mark popup as shown for this session
    sessionStorage.setItem('eventPopupShown', 'true');
    
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(eventConfig.whatsappMessage);
    const whatsappUrl = `https://wa.me/${eventConfig.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    handleClose();
  };

  const handleButtonClick = (link) => {
    handleClose();
    // If you want to navigate to the link, you can use React Router's navigate here
    // For now, we'll just close the popup
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-[99999] p-4 transition-all duration-500 ${
        isClosing ? 'opacity-0 backdrop-blur-none' : 'opacity-100 backdrop-blur-md'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-popup-title"
      style={{
        background: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="relative">
        {/* Close Button - Positioned outside and above the card */}
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 sm:-top-8 sm:-right-4 z-40 bg-white/95 backdrop-blur-md text-[#070915] rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-[#48D3A3] hover:text-white transition-all duration-200 text-sm sm:text-xl md:text-2xl font-bold border-2 border-[#48D3A3] font-One shadow-lg"
          aria-label="Close popup"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          ✕
        </button>

        <div 
          className={`relative bg-[#070915]/95 backdrop-blur-xl border border-[#48D3A3]/30 rounded-2xl shadow-2xl w-auto max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[60vw] max-h-[95vh] overflow-hidden transform transition-all duration-500 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(7, 9, 21, 0.95)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(72, 211, 163, 0.3), inset 0 1px 0 rgba(72, 211, 163, 0.1)',
          }}
        >
        {/* Event Image */}
        <div className="relative">
          <img
            src={eventConfig.image}
            alt="Special Event at OneRepMaax Gym"
            className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-cover rounded-t-2xl"
            loading="eager"
          />
          
          {/* Simple gradient overlay only if content exists */}
          {(eventConfig.title || eventConfig.subtitle) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl"></div>
          )}
          
          {/* Overlay Content - Only show if content exists */}
          {(eventConfig.title || eventConfig.subtitle) && (
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
              {eventConfig.title && (
                <h2 id="event-popup-title" className="text-sm sm:text-lg font-One font-bold mb-1 leading-tight text-[#48D3A3]">
                  {eventConfig.title}
                </h2>
              )}
              {eventConfig.subtitle && (
                <p className="text-xs sm:text-sm font-DM opacity-90 leading-relaxed text-gray-200">
                  {eventConfig.subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="p-3 sm:p-4 md:p-6 bg-[#070915]/90 backdrop-blur-md border-t border-[#48D3A3]/20">
          {/* Event Info Section */}
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-One font-bold text-[#48D3A3] mb-1">
              🏋️‍♂️ Join OneRepMaax Community
            </h3>
            <p className="text-xs sm:text-sm font-DM text-gray-300">
              Transform your fitness journey with Jamshedpur's premier gym
            </p>
          </div>
          
          {/* WhatsApp CTA Button */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white font-One font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-[#20BA5A] hover:to-[#1DA851] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 sm:gap-3 border border-white/10"
            style={{
              boxShadow: '0 10px 25px -5px rgba(37, 211, 102, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <span className="text-lg sm:text-xl">💬</span>
            <span className="text-sm sm:text-lg">CONNECT ON WHATSAPP</span>
          </button>
          
          {/* Additional Info */}
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-xs font-DM text-gray-400">
              ⭐ 4.9 Rating • 🏆 K11 Certified Trainers • 📍 Mango, Jamshedpur
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EventPopup;
