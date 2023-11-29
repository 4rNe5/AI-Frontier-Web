'use client'

import Lottie from "lottie-react";
import LoadingAni from "../../public/LoadAni.json"

export default function Loading() {
    return (
        <>
            <div className={`items-center flex justify-center  my-auto mt-[250px]`}>
                <Lottie animationData={LoadingAni} loop={true} className={`w-[400px] h-[300px]`}/>
            </div>
        </>
    )
}