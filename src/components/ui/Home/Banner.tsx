const Banner = () => {
  return (
    <section 
      className="hero bg-cover bg-center h-screen flex items-center justify-center text-white relative"
      style={{ backgroundImage: 'url(https://i.ibb.co/Thpg2xc/DALL-E-2024-09-01-21-50-44-A-hero-section-of-a-modern-car-wash-service-website-The-background-shows.webp)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-6">
       
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Experience the Ultimate Shine
        </h1>
        <p className="text-lg mb-6">
          Top-quality car care with eco-friendly solutions.
        </p>
        <a 
          href="#book-now" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Book Now
        </a>
      </div>
    </section>
  );
};

export default Banner;
