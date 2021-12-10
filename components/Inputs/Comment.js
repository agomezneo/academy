import React from 'react';
import Image from 'next/image';

function Comment({name, message, image, created}) {
    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-5 rounded-lg shadow-xl ">
                <div className="flex items-center space-x-2">
                    <img 
                        className="rounded-full"
                        src={image ? image : "/img/avatar.svg"} 
                        width={40}
                        height={40} 
                        alt="profile"
                    />
                    <div >
                        <p className="font-medium text-black">{name}</p>
                        <p className="text-xs text-gray-400"> {created} </p>
                    </div>
                </div>
                <p className="pt-4 text-black"> {message} </p>
            </div>
        </div>
    )
}

export default Comment
