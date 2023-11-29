'use client'

import Image from 'next/image'
import React, {useState} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductLogo from "../../public/CCA.svg"
import Logo from "../../public/나홀로마이스터.svg"

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let Img = URL.createObjectURL(event.target.files[0]);
      setImage(Img);
      getBase64(img)
          .then(base64 => setSelectedImage(base64))
          .catch(error => console.log(error));
    }
  }

  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
      let reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.replace(/^data:.+;base64,/, ''));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const sendImageToApi = async () => {
    try{
      const response= await axios.post('https://aifrontier.wsuk.dev/api/image', {img: selectedImage});

      // Parse the result field from the response
      const parsedResult = JSON.parse(response.data.result);

      setApiResponse(parsedResult);

    } catch(error){
      console.log(error);
    }
  }

  const diseaseMap={
    "0":"COVID-19(코로나 19)",
    "1":"NORMAL(정상)",
    "2":"PNEUMONIA(결핵)",
    "3":"TUBERCULOSIS(폐렴)"
  }

  return (
      <div className={`justify-center flex items-center mt-[80px] gap-[50px]`}>
        <div className={`w-[687px] h-[675px]`}>
          <div className={`justify-center items-center mt-[5px]`}>
            {image && <motion.div initial={{opacity:0, scale:0}} animate={{opacity: 1, scale:1}} transition={{duration: 1.5, type:"spring", bounce: 0.3}} className={`items-center justify-center flex mt-[55px]`}><Image className={`rounded-2xl`} src={image} alt={'img Upload'} width={500} height={400}/></motion.div>}
            {image ? <motion.div className={`justify-center flex items-center mt-[60px] gap-[60px]`}>
              <motion.div initial={{scale: 1}} whileHover={{scale: 1.15}} transition={{type: "spring", duration: 1, bounce: 0.5}}>
                <button  onClick={sendImageToApi} className={`p-3 bg-green-400 shadow-xl rounded-xl text-2xl font-bold text-white`}>Send Image</button>
              </motion.div>
            </motion.div> : <div className={`justify-center grid items-center mt-[300px] gap-[60px]`}>
              <motion.div initial={{scale: 1}} whileHover={{scale: 1.15}} transition={{type: "spring", duration: 1, bounce: 0.5}} className={`bg-green-400 w-[280px] h-[55px] rounded-xl flex justify-center items-center shadow-xl`}>
                <input type="file" onChange={onImageChange} className={`ml-[10px]`}/>
              </motion.div>
              <motion.div initial={{scale: 1}} whileHover={{scale: 1.15}} transition={{type: "spring", duration: 1, bounce: 0.5}}>
                <button  onClick={sendImageToApi} className={`p-3 bg-green-400 shadow-xl items-center rounded-xl text-2xl font-bold text-white ml-[55px]`}>Send Image</button>
              </motion.div>
            </div>}
          </div>
          {apiResponse && <div className={`w-[657px] h-[50px] bg-green-300 shadow-xl mt-[70px] rounded-xl flex items-center justify-center`}>
            {apiResponse &&
                <div className={`text-center text-xl font-bold text-black`}>
                  {apiResponse.label ?
                      <h1>해당 폐는 이상이 없을 확률이 높습니다.</h1> :
                      <h1>해당 폐가 가진 질병은 <span className={`text-2xl text-red-400 items-center text-center`}>{diseaseMap[apiResponse.label]}</span>  확률이 높습니다.</h1>}
                </div>
            }
          </div>}
        </div>
        <div className={`w-[2px] h-[80vh] bg-gray-300 rounded-md`} />
        <div className={`w-[757px] h-[735px] rounded-2xl`}>
          <div className={`justify-center items-center grid ml-[230px]`}>
            <div>
              <Image className={`ml-[340px] mb-[50px]`} src={ProductLogo} alt={'Product-logo'} width={180} height={160} />
            </div>
            <div className={`mt-[140px]`}>
              <h1 className={`font-bold text-[70px]`}>
                당신의 <span className={`text-[80px] text-purple-500`}>폐</span>를 한번에 <br /> 진단해보세요
              </h1>
            </div>
            <div className={`ml-[230px] mt-[245px]`}>
              <Image src={Logo} alt={'Logo-img'} width={300} height={280}/>
            </div>
          </div>
        </div>
      </div>
  )
}