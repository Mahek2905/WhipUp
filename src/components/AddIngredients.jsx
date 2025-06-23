import { LuPlus } from "react-icons/lu";

export default function AddIngredients(props) {

    return (
        <>
            {/* Box to add ingredients and display them */}
            <div className="sticky w-full h-fit lg:w-[35%] flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-6">

                {/* Heading of the Card */}
                <div className="flex justify-start items-center">
                    <div className="flex justify-center items-center bg-orange-100 h-12 w-12 mr-3 rounded-lg text-2xl">🥬</div>
                    <h2 className="text-2xl font-semibold text-gray-800">Your Ingredients</h2>
                </div>

                {/* TextField and Button */}
                <form action={props.handleAddIngredient} className="flex gap-2">
                    <input
                        type="text"
                        name="ingredient"
                        placeholder="Add an ingredient..."
                        className="h-10 w-full rounded-md px-3 py-2 border focus-visible:ring-black focus-visible:ring-offset-1 focus-visible:ring-1 transition-all duration-200 outline-none flex-1"
                        aria-label="Add an ingredient" 
                        />
                    <button type='submit' className="h-10 flex justify-center items-center rounded-md bg-orange-600 hover:bg-orange-700 px-4 py-2">
                        <LuPlus size={20} color='white' />
                    </button>
                </form>

                {/* Quick Add */}
                <div>
                    <p className='text-sm font-medium text-gray-600'>Quick add:</p>
                    <div className='mt-2 flex flex-wrap gap-2'>
                        {props.QuickAdds.map((item, idx) => 
                            <button 
                                key={idx}
                                onClick={() => props.handleQuickAdd(item)} 
                                className='px-3 py-1 text-sm text-[#020817] rounded-full bg-gray-100 hover:bg-orange-100 transition-colors duration-200 capitalize'>
                                    {item}</button>
                        )}
                    </div>
                </div>

                {/* Display the chosen/added ingredients  */}
                {props.addIngredients.length > 0 && (
                    <div className='mt-4 flex flex-col'>
                        <h3 className='font-medium text-gray-700 mb-3'>Added Ingredients:</h3>

                        <ul className='flex flex-col gap-2'>
                            {props.addIngredients.map((item, idx) => 
                                <li key={idx} className='group bg-orange-50 hover:bg-orange-100 transition-colors duration-200 rounded-lg py-3 px-5 flex items-center justify-between'>
                                    <span className='capitalize text-gray-700 font-medium'>{item}</span> 
                                    <button 
                                        onClick={() => props.handleDeleteIngredient(item)} 
                                        className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 text-xl font-semibold'>
                                            x
                                    </button>
                                </li>
                            )}
                        </ul>

                        {/* Message box to track the no. of ingredients and recipes */}
                        <div className='p-4 text-base rounded-lg mt-6 bg-orange-50'>
                            <p className='text-orange-700'>
                                <strong>{props.addIngredients.length}</strong> ingredients added
                            </p>
                            <p className='text-orange-600 mt-1'>
                                Found <strong>{props.recipes.length}</strong> matching recipes
                            </p>
                        </div>
                    </div>
                )}

                {/* Message to display when no ingredients added */}
                {props.addIngredients.length === 0 && (
                    <div className='py-8 mt-4 flex flex-col justify-center items-center text-[#6B7280]'>
                        <span className='text-4xl mb-2'>🛒</span>
                        <p className='font-medium'>No ingredients added yet</p>
                        <p className='text-sm'>Add some ingredients to find recipes!</p>
                    </div>
                )}
            </div>
        </>
    )
}