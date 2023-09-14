
import React from 'react';
import Image from 'next/image'
import Link from "next/link"

const CustomErrorPage = () => {
    return (
    <div className='h-screen flex flex-col justify-center items-center py-10 w-full bg-black relative'>
      
      <Link href="/" className=" text-gray-200 absolute top-0 pt-10">
        <h1 className="text-gray-300  hover:text-blue-300 "> Go back home</h1>
      </Link>
      <Image
      src="/error.jpg"
      width={400}
      height={400}
      style={{objectFit: 'contain'}}
      />
    </div>
  );
};

export default CustomErrorPage;

