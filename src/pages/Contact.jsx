import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    message: '',
    error: false,
  });
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        error: true,
      });
      return;
    }

    setTimeout(() => {
      setFormStatus({
        submitted: true,
        message:
          'ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด',
        error: false,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setFormStatus({
          submitted: false,
          message: '',
          error: false,
        });
      }, 5000);
    }, 1000);
  };

  const contactInfo = [
    { id: 'address', icon: '📍', title: 'ที่อยู่', content: '90 ถนน เทศา ตำบล พระปฐมเจดีย์ อำเภอ เมือง นครปฐม 73000' },
    { id: 'phone', icon: '📞', title: 'โทรศัพท์', content: '034-252-790 034-241-853' },
    { id: 'email', icon: '✉️', title: 'อีเมล', content: 'GoGlobal@gmail.com' },
    { id: 'hours', icon: '🕒', title: 'เวลาทำการ', content: 'จันทร์ - ศุกร์: 9:00 - 18:00 น., เสาร์: 10:00 - 16:00 น.' },
  ];

  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full px-6 py-12 flex flex-col items-center pt-24">
      <div className="max-w-6xl w-full mx-auto">
        {/* Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-1 bg-[#0D0E0E] rounded-full" />
          <motion.h1
            className="text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ติดต่อเรา
          </motion.h1>
        </div>

        <motion.p
          className="text-gray-800 text-lg mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          เรายินดีที่จะได้ยินจากคุณ ไม่ว่าจะเป็นคำถาม ข้อเสนอแนะ
          หรือการร่วมมือต่างๆ กรุณากรอกแบบฟอร์มด้านล่างหรือติดต่อเราโดยตรงผ่านช่องทางที่ให้ไว้
        </motion.p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'form'
                ? 'bg-white text-gray-800'
                : 'bg-[#0D0E0E] text-white hover:bg-[#100E09]'
            }`}
            onClick={() => setActiveTab('form')}
          >
            ส่งข้อความ
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'info'
                ? 'bg-white text-gray-800'
                : 'bg-[#0D0E0E] text-white hover:bg-[#100E09]'
            }`}
            onClick={() => setActiveTab('info')}
          >
            ข้อมูลติดต่อ
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {activeTab === 'form' && (
            <>
              {/* Form */}
              <motion.div
                className="lg:col-span-8 bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">ส่งข้อความถึงเรา</h2>

                {formStatus.submitted && (
                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      formStatus.error
                        ? 'bg-red-100 border border-red-400'
                        : 'bg-green-100 border border-green-400'
                    }`}
                  >
                    <p
                      className={
                        formStatus.error ? 'text-red-700' : 'text-green-700'
                      }
                    >
                      {formStatus.message}
                    </p>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ-นามสกุล*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D0E0E]"
                      placeholder="กรุณาระบุชื่อของคุณ"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      อีเมล*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D0E0E]"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      หัวข้อ
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D0E0E]"
                      placeholder="หัวข้อของข้อความ"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      ข้อความ*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D0E0E] resize-none"
                      placeholder="รายละเอียดข้อความของคุณ"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#0D0E0E] text-white rounded-lg font-medium hover:bg-[#100E09] transition-all"
                    >
                      ส่งข้อความ
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Map */}
              <motion.div
                className="lg:col-span-4 bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">ที่อยู่บริษัท</h2>
                <p className="text-gray-700 mb-4">
                  90 ถนน เทศา ตำบล พระปฐมเจดีย์ อำเภอ เมือง นครปฐม 73000
                </p>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.122465870436!2d100.06731331534344!3d13.819925590756614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2e5c243cc7c87%3A0x1e2896260e30270a!2sNakhon+Pathom+Vocational+College!5e0!3m2!1sen!2sth!4v1630369536422!5m2!1sen!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            </>
          )}

          {/* ข้อมูลติดต่อเมื่อ activeTab === "info" */}
          {activeTab === 'info' && (
            <motion.div
              className="lg:col-span-12 bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">ข้อมูลการติดต่อ</h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.id}
                    className="p-5 border border-gray-200 rounded-lg hover:border-gray-400 transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl">{info.icon}</span>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          {info.title}
                        </h3>
                        <p className="text-gray-600">{info.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
