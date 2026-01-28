import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-sm text-gray-800">

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img 
            src="/img/icon.png" 
            alt="GoGlobal Logo" 
            className="w-16 sm:w-20 md:w-24 mb-2 sm:mb-3" // ปรับขนาดตาม screen
          />
          <h2 className="text-xl sm:text-2xl font-bold">GoGlobal</h2>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <h3 className="font-semibold">เมนู</h3>
          <ul className="space-y-1">
            <Link to="/" className="no-underline text-gray-800">หน้าแรก</Link>
            <Link to="/trips" className="no-underline text-gray-800">ทริปต่างๆ</Link>
            <Link to="/guides" className="no-underline text-gray-800">ไกด์</Link>
            <Link to="/about" className="no-underline text-gray-800">เกี่ยวกับ</Link>
            <Link to="/contact" className="no-underline text-gray-800">ติดต่อ</Link>
          </ul>
        </div>
        
        <div className="hidden md:flex flex-col items-start space-y-2">
          <h3 className="font-semibold">เอเชีย</h3>
          <ul className="space-y-1">
            <li><Link to="/countries#all" className="hover:text-blue-600">ทุกประเทศ</Link></li>
            <li><Link to="/countries#eastasia" className="hover:text-blue-600">เอเชียตะวันออก</Link></li>
            <li><Link to="/countries#sea" className="hover:text-blue-600">เอเชียตะวันออกเฉียงใต้</Link></li>
            <li><Link to="/countries#southasia" className="hover:text-blue-600">เอเชียใต้</Link></li>
            <li><Link to="/countries#centralasia" className="hover:text-blue-600">เอเชียกลาง</Link></li>
            <li><Link to="/countries#westasia" className="hover:text-blue-600">ตะวันออกกลาง / เอเชียตะวันตก</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 mt-4 md:mt-0 md:col-span-3">
          <h3 className="font-semibold">ติดต่อ</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Mail className="w-4 h-4" />
            <span>GoGlobal@gmail.com</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Phone className="w-4 h-4" />
            <span>099-2346789</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
