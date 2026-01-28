import React from 'react'
import Description from '../components/Description';
import Highlights from '../components/Highlights';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <>
      <section
        className="bg-[#F5F5F5] relative min-h-[70vh] flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://image.makewebeasy.net/makeweb/crop/wvcCMuduF/home/zone1_BG_2x.webp?v=202405291424&x=0&y=0&w=3840&h=1386')",
        }}
      >
        <div className="absolute inset-0 bg-opacity-40"></div>

        <motion.div
          className="relative z-10 p-8 text-center text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            ยินดีต้อนรับสู่ Guide Booking
          </motion.h1>

          <motion.p
            className="text-base md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            ออกแบบการเดินทางอย่างมีความหมาย สร้างสายสัมพันธ์ที่แท้จริง
          </motion.p>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Description />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Highlights />
      </motion.div>
    </>
  )
}

export default Home
