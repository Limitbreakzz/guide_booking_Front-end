import React, { useState } from 'react'
import { motion } from 'framer-motion'

const tabs = [
  { id: 'history', label: 'ประวัติ' },
  { id: 'attractions', label: 'สถานที่ท่องเที่ยว' },
  { id: 'culture', label: 'วัฒนธรรม' }

]

const tabContent = {
  history: {
    title: 'ประวัติศาสตร์อันยาวนานของเอเชีย',
    description:
      'เอเชียเป็นทวีปที่มีประวัติศาสตร์ยาวนานและหลากหลาย แต่ละประเทศมีเรื่องราวและอารยธรรมที่แตกต่างกัน ตั้งแต่ราชอาณาจักรโบราณในจีน อินเดีย ญี่ปุ่น จนถึงอาณาจักรสยามในเอเชียตะวันออกเฉียงใต้ นักท่องเที่ยวสามารถเรียนรู้และสัมผัสมนต์เสน่ห์ของประวัติศาสตร์เอเชียในแต่ละภูมิภาค',
    facts: [
      'มีอารยธรรมเก่าแก่กว่า 5,000 ปี',
      'หลายพื้นที่ได้รับการขึ้นทะเบียนเป็นมรดกโลก',
      'รวมศิลปะ วัฒนธรรม และประวัติศาสตร์จากหลายอาณาจักร'
    ]
  },
  attractions: {
    title: 'สถานที่ท่องเที่ยวเด่นในเอเชีย',
    description:
      'เอเชียมีสถานที่ท่องเที่ยวหลากหลาย ทั้งธรรมชาติที่งดงาม เมืองทันสมัย และวัดวาอารามที่มีชื่อเสียงระดับโลก',
    facts: [
      'เกาะบาหลี ประเทศอินโดนีเซีย',
      'วัดทองในพม่า',
      'ฮาลองเบย์ ประเทศเวียดนาม',
      'โตเกียวและเกียวโต ประเทศญี่ปุ่น',
      'พระราชวังโปตาลา ประเทศทิเบต'
    ]
  },
  culture: {
    title: 'วัฒนธรรมและประเพณีเอเชีย',
    description:
      'เอเชียเป็นทวีปที่มีวัฒนธรรมและประเพณีหลากหลาย นักท่องเที่ยวสามารถสัมผัสงานเทศกาลและพิธีกรรมที่โดดเด่นในแต่ละประเทศ',
    facts: [
      'เทศกาลโคมไฟในไต้หวัน',
      'สงกรานต์ในประเทศไทย',
      'เทศกาล Diwali ในอินเดีย',
      'งานตรุษจีนในหลายประเทศเอเชีย'
    ]
  },
  gallery: {
    title: 'แกลเลอรี่เอเชีย',
    description:
      'ชมภาพบรรยากาศ ธรรมชาติ และสถานที่ท่องเที่ยวที่น่าประทับใจจากทั่วเอเชีย ทั้งภูเขา ชายหาด วัดวาอาราม และเมืองสมัยใหม่'
  }
}

const images = [
  { url: '/img/โตเกียว.jpg', location: 'Japan ญี่ปุ่น', caption: 'Tokyo โตเกียว' },
  { url: '/img/เกาหลีใต้.jpg', location: 'South Korea เกาหลีใต้', caption: 'Seoul โซล' },
  { url: '/img/ปักกิ่ง.jpg', location: 'China จีน', caption: 'Beijing ปักกิ่ง' },
  { url: '/img/เชียงใหม่.jpg', location: 'Thailand ไทย', caption: 'Chiang Mai เชียงใหม่' }
]

const About = () => {
  const [activeTab, setActiveTab] = useState('history')
  const [activeImg, setActiveImg] = useState(0)

  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full px-6 py-12 flex flex-col items-center pt-24">
      <div className="max-w-6xl w-full mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-12 w-1 bg-[#0D0E0E] rounded-full" />
          <h1 className="text-4xl font-bold text-gray-800">เกี่ยวกับเรา</h1>
        </motion.div>

        <motion.p
          className="text-gray-800 text-lg mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          ค้นพบความงดงามและเสน่ห์ของสถานที่ท่องเที่ยวในเอเชีย ที่เต็มไปด้วยประวัติศาสตร์ วัฒนธรรม และธรรมชาติอันน่าทึ่ง
        </motion.p>

        <motion.div
          className="flex gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-800'
                  : 'bg-[#0D0E0E] text-white hover:bg-[#100E09]'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {tabContent[activeTab].title}
            </h2>
            <p className="text-gray-800 mb-6">{tabContent[activeTab].description}</p>
            {activeTab !== 'gallery' && (
              <ul className="mb-8 list-disc list-inside text-gray-800 space-y-2">
                {tabContent[activeTab].facts.map((fact, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 }}
                  >
                    {fact}
                  </motion.li>
                ))}
              </ul>
            )}
            
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-64 rounded-xl overflow-hidden mb-4"
            >
              <img
                src={images[activeImg].url}
                alt={images[activeImg].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <p className="text-gray-200 text-sm">{images[activeImg].location}</p>
                <p className="text-white font-semibold text-lg">{images[activeImg].caption}</p>
              </div>
            </motion.div>

            <div className="flex gap-3 mt-2">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  className={`w-8 h-2 rounded-full transition-all ${
                    idx === activeImg ? 'bg-white' : 'bg-[#0D0E0E]'
                  }`}
                  onClick={() => setActiveImg(idx)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About
