import { useState } from 'react';
import { LuClock4, LuUsers, LuCircleCheckBig, LuCircle } from "react-icons/lu";

export default function Recipes(props) {

    const [ visibleIndex, setVisibleIndex ] = useState();
    function showRecipe(index) {
        setVisibleIndex(prev => (prev === index ? null : index));
    }

    return (
        <>
        {/* List of Recipes */}
        {props.bulkInfo.length > 0 && 
            <div className='flex flex-col'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6'>Recipes You Can Make ({props.bulkInfo.length})</h2>

                {/* Recipe Box */}
                {props.bulkInfo.map((data, idx) => 
                <div key={data.id} className='w-full mb-4 bg-white rounded-lg shadow-sm border hover:shadow-xl transition-shadow duration-300'>

                    <div className='pt-2 px-2 flex justify-center items-center'>
                        <img src={data.image} alt={data.title} className={`w-full h-48 object-cover ${visibleIndex === idx ? "h-full" : null}`} />
                    </div>

                    <div className='flex flex-col p-6 gap-4'>
                        <h3 className='text-2xl font-bold text-gray-800'>{data.title}</h3>

                        <div className='flex items-center gap-6 text-sm text-gray-600'>
                            <span className='flex items-center gap-2'>
                                <LuClock4 size={16} /> {data.readyInMinutes} minutes
                            </span>
                            <span className='flex items-center gap-2'>
                                <LuUsers size={16} /> {data.servings} servings
                            </span>
                        </div>

                        <div className='flex flex-row gap-12'>
                            {data.diets.length > 0 && 
                            <label>
                                <span className='font-semibold text-green-700 flex gap-2 items-center mb-2'>
                                    <LuCircleCheckBig size={16} /> Diets:
                                </span>
                                <ul className='flex flex-col gap-1 text-green-700 text-sm'>
                                    {data.diets.map((item, idx) => 
                                        <li key={idx} className='flex items-center gap-2'>
                                            <LuCircle size={12} className='text-green-500' /> {item}
                                        </li>
                                    )}
                                </ul>
                            </label>}

                            {data.dishTypes.length > 0 && <label>
                                <span className='font-semibold text-green-700 flex gap-2 items-center mb-2'>
                                    <LuCircleCheckBig size={16} /> Dish Types:
                                </span>
                                <ul className='flex flex-col gap-1 text-green-700 text-sm'>
                                    {data.dishTypes.map((item, idx) => 
                                        <li key={idx} className='flex items-center gap-2'>
                                            <LuCircle size={12} className='text-green-500' /> {item}
                                        </li>
                                    )}
                                </ul>
                            </label>}

                        </div>

                        <button 
                            onClick={() => showRecipe(idx)}
                            className='px-4 py-2 w-[30%] max-sm:w-full text-center rounded-md font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-300'>
                                {visibleIndex === idx ? "Hide" : "Show"} Full Recipe
                        </button>

                        {/* Full Recipe */}
                        {visibleIndex === idx && 
                        <div className='mt-6 pt-6 border-t border-gray-200'>

                            <h4 className='card-headings'>Ingredients:</h4>
                            <ul className='gap-2 list-disc list-inside marker:text-orange-600 marker:w-6'>
                                {data.extendedIngredients.map((item, idx) => 
                                    <li key={idx} className='text-gray-700 gap-2'>
                                        {item.original}
                                    </li>
                                )}
                            </ul>

                            <h4 className='card-headings mt-4'>Instructions:</h4>
                            <ul className='gap-2 list-disc list-inside marker:text-orange-600 marker:w-6'>
                                {data.analyzedInstructions[0].steps.map((instruction, idx) => 
                                    <li key={idx} className='text-gray-700 gap-2'>
                                        {instruction.step} <br />
                                        {instruction.equipment.length > 0 &&
                                            <p className='ml-6 mb-2'><b>Equipments Required: </b>
                                            {instruction.equipment.map((item, idx) => 
                                                <span>{item.name}{instruction.equipment.length === idx + 1 ? "." : ","} </span>
                                            )}
                                            </p>    
                                        }
                                    </li>
                                )}
                            </ul>
                        </div>}
                    </div>
                </div>)}
            </div>}
        </>
    )
}