import Image from "next/image";

const LogoCloud = () => (
  <div className="w-full py-8 lg:py-16">
    <div className="container mx-auto">
      {/* LOGO CLOUD  */}
      <div className="p-4 mb-2 lg:mb-2">
        <p className="text-center text-xl font-medium text-gray-500 mb-10 lg:mb-12">
          150+ dosen dari berbagai universitas mempercayakan tugasnya kepada kami
        </p>
        <div className="flex items-center justify-center max-h-12 w-full object-contain lg:col-span-1 space-x-10">
          <Image src="/logo/Logo_PENS.png" alt="PENS" width={60} height={60} className="grayscale hover:grayscale-0" />
          <Image src="/logo/logo-unair.png" alt="UNAIR" width={60} height={60} className="grayscale hover:grayscale-0" />
          <Image src="/logo/logo-unesa.png" alt="UNESA" width={60} height={60} className="grayscale hover:grayscale-0" />
          <Image src="/logo/logo-unesa.png" alt="UNESA" width={60} height={60} className="grayscale hover:grayscale-0" />
          <Image src="/logo/logo-unesa.png" alt="UNESA" width={60} height={60} className="grayscale hover:grayscale-0" />
        </div>
      </div>
    </div>
  </div>
);

export default LogoCloud; 