"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Upload, ChefHat, Clock, Users } from "lucide-react";
import { addARecipe } from "@/src/services/recipeService";
import { message } from "antd";

interface FormDataType {
  title: string;
  description: string;
  cuisine: string;
  difficulty: string;
  dietaryOptions: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  tags: string;
  image: File | null;
}

export default function AddRecipePage() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    cuisine: "",
    difficulty: "",
    dietaryOptions: "None",
    servings: "",
    prepTime: "",
    cookTime: "",
    tags: "",
    image: null,
  });

  const [ingredients, setIngredients] = useState([
    { amount: "", ingredientName: "" },
    { amount: "", ingredientName: "" },
    { amount: "", ingredientName: "" },
  ]);

  const [steps, setSteps] = useState(["", "", ""]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const cuisineTypes = [
    "Italian",
    "Japanese",
    "Mexican",
    "Indian",
    "French",
    "Thai",
    "Chinese",
    "American",
    "Mediterranean",
    "Other",
  ];

  const difficulties = ["Easy", "Medium", "Hard"];
  const dietaryOptions = [
    "None",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { amount: "", ingredientName: "" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Recipe title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.cuisine) newErrors.cuisine = "Cuisine type is required";
    if (!formData.difficulty)
      newErrors.difficulty = "Difficulty level is required";
    if (!formData.servings) newErrors.servings = "Servings is required";
    if (!formData.prepTime.trim()) newErrors.prepTime = "Prep time is required";
    if (!formData.cookTime.trim()) newErrors.cookTime = "Cook time is required";

    const validIngredients = ingredients.filter(
      (ing) => ing.amount.trim() && ing.ingredientName.trim()
    );
    if (validIngredients.length === 0) {
      newErrors.ingredients = "At least one ingredient is required";
    }

    const validSteps = steps.filter((step) => step.trim());
    if (validSteps.length === 0) {
      newErrors.steps = "At least one instruction step is required";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    try {
      // Filter out empty ingredients and steps
      const validIngredients = ingredients.filter(
        (ing) => ing.amount.trim() && ing.ingredientName.trim()
      );
      const validSteps = steps.filter((step) => step.trim());

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("cuisine", formData.cuisine);
      fd.append("difficulty", formData.difficulty);
      fd.append("dietaryOptions", formData.dietaryOptions);
      fd.append("servings", formData.servings);
      fd.append("prepTime", formData.prepTime);
      fd.append("cookTime", formData.cookTime);
      fd.append("tags", JSON.stringify(
        formData.tags
          .split(",")
          .map((tag: String) => tag.trim())
          .filter((tag: String) => tag)
      ));
      if (formData.image) {
        fd.append("image", formData.image);
      }
      fd.append("ingredientList", JSON.stringify(validIngredients));
      fd.append("steps", JSON.stringify(validSteps));

      // const recipeData = {
      //   ...formData,
      //   ingredientList: validIngredients,
      //   steps: validSteps,
      //   tags: formData.tags
      //     .split(",")
      //     .map((tag: String) => tag.trim())
      //     .filter((tag: String) => tag),
      // };
      // TODO: Call your API to save the recipe
      // await saveRecipe(recipeData);

      // Simulate API call
      console.log("Submitting recipe data:", fd);
      const response = await addARecipe(fd);
      if (response.status === "Successful") {
        messageApi.success("Recipe published successfully!");
        router.push("/recipe");
      } else {
        messageApi.error("Failed to publish recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      messageApi.error("Something went wrong. Please try again.");
      // alert("Failed to publish recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    console.log("Saving as draft...");
    alert("Recipe saved as draft!");
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-linear-to-b from-orange-50 via-white to-amber-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-4 transition-colors"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <div className="flex items-center gap-3 mb-2">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <h1 className="text-3xl font-bold text-gray-900">
                Create New Recipe
              </h1>
            </div>
            <p className="text-gray-600">
              Share your culinary creation with the TasteSphere community
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8">
            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-800 font-semibold mb-2">
                  Please fix the following errors:
                </p>
                <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                  {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Authentic Italian Carbonara"
                  className={`w-full px-4 py-3 border-2 ${
                    errors.title ? "border-red-400" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Share what makes this recipe special..."
                  className={`w-full px-4 py-3 border-2 ${
                    errors.description ? "border-red-400" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none`}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 ${
                      errors.cuisine ? "border-red-400" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  >
                    <option value="">Select cuisine...</option>
                    {cuisineTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 ${
                      errors.difficulty ? "border-red-400" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  >
                    <option value="">Select difficulty...</option>
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Options
                  </label>
                  <select
                    name="dietaryOptions"
                    value={formData.dietaryOptions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  >
                    {dietaryOptions.map((diet) => (
                      <option key={diet} value={diet}>
                        {diet}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servings <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="servings"
                      value={formData.servings}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="4"
                      className={`w-full pl-12 pr-4 py-3 border-2 ${
                        errors.servings ? "border-red-400" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prep Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 15 min"
                      className={`w-full pl-12 pr-4 py-3 border-2 ${
                        errors.prepTime ? "border-red-400" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cook Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="cookTime"
                      value={formData.cookTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 30 min"
                      className={`w-full pl-12 pr-4 py-3 border-2 ${
                        errors.cookTime ? "border-red-400" : "border-gray-200"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Recipe Photos */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Recipe Photos
              </h3>
              <label className="block">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Handle file upload logic here
                      console.log("Selected file:", file);
                      setFormData((prev) => ({ ...prev, image: file }) );
                    }
                  }} // optional handler
                />

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG up to 10MB (Required)
                  </p>
                </div>
              </label>
            </div>

            {/* Section 3: Ingredients */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Ingredients <span className="text-red-500">*</span>
              </h3>
              {errors.ingredients && (
                <p className="text-red-500 text-sm">{errors.ingredients}</p>
              )}
              <p className="text-sm text-gray-600">
                Add each ingredient with its measurement
              </p>

              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Amount (e.g., 2 cups)"
                      value={ingredient.amount}
                      onChange={(e) =>
                        handleIngredientChange(index, "amount", e.target.value)
                      }
                      className="w-1/3 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Ingredient name"
                      value={ingredient.ingredientName}
                      onChange={(e) =>
                        handleIngredientChange(index, "ingredientName", e.target.value)
                      }
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    <button
                      onClick={() => removeIngredient(index)}
                      className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addIngredient}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Another Ingredient
              </button>
            </div>

            {/* Section 4: Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Cooking Instructions <span className="text-red-500">*</span>
              </h3>
              {errors.steps && (
                <p className="text-red-500 text-sm">{errors.steps}</p>
              )}
              <p className="text-sm text-gray-600">
                Write step-by-step instructions
              </p>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-2">
                      {index + 1}
                    </div>
                    <textarea
                      rows={2}
                      placeholder={`Step ${
                        index + 1
                      }: Describe this cooking step in detail...`}
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                    />
                    <button
                      onClick={() => removeStep(index)}
                      className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors mt-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addStep}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Another Step
              </button>
            </div>

            {/* Section 5: Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </span>
                Tags (Optional)
              </h3>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Add tags separated by commas (e.g., pasta, quick dinner, comfort food)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  "Publish Recipe"
                )}
              </button>
              <button
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save as Draft
              </button>
              <button
                onClick={() => router.back()}
                disabled={isLoading}
                className="px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
