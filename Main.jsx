import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromMistral } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [loaderShown, setLoaderShown] = React.useState(false)
    const [errorShown, setErrorShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        // hide error if any
        setErrorShown(false)
        // set loading spinner
        setLoaderShown(true)
        
        getRecipeFromMistral(ingredients)
            .then(res => {
                // unset loading spinner
                setLoaderShown(false)
                // save recipe in state
                setRecipe(res)
                setRecipeShown(true)
            })
            .catch(err => {
                // unset loading spinner
                setLoaderShown(false)
                // set error message
                setErrorShown(err)
            })
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        newIngredient.replace(/ /g, "") && setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }
            {recipeShown && <ClaudeRecipe recipe={recipe} />}
            {loaderShown && !recipeShown  && <div className="loader loader-msg">Creating your recipe...</div>}
            {errorShown && <div className="error error-msg">Something went wrong with your request. Try again later</div>}
        </main>
    )
}