const addRecipe = async (payload, authUser) => {
    try {
        const newRecipe = await User.create({
            ...payload,
            userId: authUser.id,
            imageURL: null
        });

        return {
            name: newRecipe.name,
            ingredients: newRecipe.ingredients,
            preparation: newRecipe.preparation,
            userId: newRecipe.userId,
            _id: newRecipe._id,
        };

    } catch (e) {
        let error = new Error(e);
        error.status = 500;
        throw error;
    }
}

module.exports = { addRecipe };