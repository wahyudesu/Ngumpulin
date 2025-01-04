import Image from "next/image";

const LogoCloud = () => {
  // Daftar logo universitas
  const logos = [
    { src: "/logo/Logo_PENS.png", alt: "PENS" },
    { src: "/logo/logo-unair.png", alt: "UNAIR" },
    { src: "/logo/logo-unesa.png", alt: "UNESA" },
    // Tambahkan logo lainnya di sini jika diperlukan
  ];

  return (
    <div className="w-full py-8 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Teks Deskripsi */}
        <div className="text-center mb-4 lg:mb-12">
          <p className="text-sm md:text-xl font-normal text-gray-500 max-w-xs md:max-w-lg mx-auto">
            150+ dosen dari berbagai universitas mempercayakan tugasnya kepada kami
          </p>
        </div>

        {/* Grid Logo */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {logos.map((logo, index) => ( 
            <div
              key={index}
              className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 transition-all duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={80} // Sesuaikan ukuran sesuai kebutuhan
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;