/// <reference types="vite/client" />

import { useEffect, useState } from 'react';
import axios from 'axios';

import AddIngredients from './AddIngredients.jsx';
import Recipes from './Recipes.jsx';

export default function Body() {

    const QuickAdds = ["Rice", "Flour", "Tomatoes", "Onions", "Potatoes", "Bread", "Pasta", "Garlic", "Cheese", "Milk", "Carrots", "Eggs"];
    const [ addIngredients, setAddIngredients ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    function handleAddIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setAddIngredients(prevIngredients => {
            if (prevIngredients.includes(newIngredient)) return prevIngredients;
            return [...addIngredients, newIngredient];
        });
    }

    function handleQuickAdd(newIngredient) {
        setAddIngredients(prevIngredients => {
            if (prevIngredients.includes(newIngredient)) return prevIngredients;
            return [...addIngredients, newIngredient];
        });
    }

    function handleDeleteIngredient(ingredient) {
        const afterDeletion = addIngredients.filter((item, _) => item != ingredient)
        setAddIngredients(afterDeletion);
    }

    useEffect(() => {
        if (addIngredients.length === 0) {
            setRecipes([]);
            setBulkInfo([]);
        } else {
            getRecipes();
        }
    }, [addIngredients]);

    const [ recipes, setRecipes ] = useState([]);
    const [ bulkInfo, setBulkInfo ] = useState([]);

    const SPOONACULAR_KEYS = [
        import.meta.env.VITE_SPOONACULAR_API_KEY1,
        import.meta.env.VITE_SPOONACULAR_API_KEY2,
        import.meta.env.VITE_SPOONACULAR_API_KEY3,
    ];

    // Fetch the Data from API
    const getRecipes = async(index = 0) => {
        setLoading(true);

        if (index >= SPOONACULAR_KEYS.length) {
            throw new Error("All API Keys failed due to rate limits or errors.");
        }
        
        const api = SPOONACULAR_KEYS[index];
        const ingredients = addIngredients.map(item => item.toLowerCase());
        const query = ingredients.join(",");

        try {
            const response = await axios.get(
                "https://api.spoonacular.com/recipes/findByIngredients",
                {
                    params: { 
                        ingredients: query,
                        number: 8,
                        ranking: 1,
                        apiKey: api, 
                    },
                }
            );

            if (response.status === 401 || !Array.isArray(response.data) || response.data.length === 0) {
                console.warn(`Key ${index + 1} failed (Status: ${response.status})`);
                return await getRecipes(index + 1); //Try next key
            }
            setRecipes(response.data);
            
        } catch (error) {
            console.error(`Failed to fetch recipe using key ${index}`, error);
            return await getRecipes(index + 1);
        }

        // Fetch Ids of all the possible recipes
        const ids = recipes.map((data, _) => data.id);
        const idString = ids.join(",");

        try {
            const bulkResponse = await axios.get(
                "https://api.spoonacular.com/recipes/informationBulk",
                {
                    params: {
                        ids: idString,
                        apiKey: api,
                    },
                }
            );
            setBulkInfo(bulkResponse.data);
        } catch (error) {
            console.error("Failed to fetch the bulk information of the recipe", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mt-12 px-8 pb-8 flex sm:flex-wrap max-sm:flex-wrap gap-8">

                <AddIngredients 
                    handleAddIngredient={handleAddIngredient} 
                    QuickAdds={QuickAdds} 
                    handleQuickAdd={handleQuickAdd} 
                    addIngredients={addIngredients} 
                    handleDeleteIngredient={handleDeleteIngredient}
                    recipes={recipes} />

                

                {/* Box to display the list of possible recipes */}
                <div className='w-full flex-1'>

                    {loading ? (
                        <div className="flex justify-center items-center py-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
                            <span className="ml-3 text-orange-500">Finding recipes for you...</span>
                        </div>
                    ) : <Recipes bulkInfo={bulkInfo} />}

                    {/* Message to display when ingredient isn't selected yet */}
                    {addIngredients.length === 0 && ( 
                        <div className='py-8 mt-4 flex flex-col justify-center items-center'>
                            <span className='text-6xl mb-4'>👨🏻‍🍳</span>
                            <p className='font-semibold text-2xl text-gray-700 mb-2'>Ready to Cook?</p>
                            <p className=' w-3/4 text-center text-gray-600'>Add your available ingredients on the left to discover delicious recipes you can make!</p>
                        </div>
                    )}

                    {/* Message to display when no recipe found */}
                    {addIngredients.length > 0 && recipes.length === 0 && (
                        <div className='py-8 mt-4 flex flex-col justify-center items-center'>
                            <span className='text-6xl mb-4'>🤔</span>
                            <p className='font-semibold text-2xl text-gray-700 mb-2'>No Recipes Found</p>
                            <p className=' w-3/4 text-center text-gray-600'>Try adding more ingredients to find recipes that match what you have!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
