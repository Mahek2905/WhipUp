import { LuChefHat } from "react-icons/lu";

export default function Header() {
    
    return (
        <>
            <div className='flex justify-center items-center mt-4'>
                <LuChefHat size={52} className="text-orange-600" />
                <h1 className='ml-4 text-[48px] font-[650]'>WhipUp!</h1>
            </div>
            <div className='flex justify-center w-full h-fit'>
                <div className='text-[20px] text-center w-[46%]'>Add your available ingredients and discover amazing recipes you can make right now!</div>
            </div>
        </>
    )
}