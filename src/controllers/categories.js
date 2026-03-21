import { getAllCategories, getCategoryById } from "../models/categories.js";
import { getProjectsByCategory } from "../models/projects.js";

const showCategoriesPage = async(req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    res.render('categories', { title , categories});
};

const showCategoryPage = async (req, res) => {
    const id = req.params.id;

    const category = await getCategoryById(id);
    const projects = await getProjectsByCategory(id);

    const title = category.c_name;

    res.render('category', {
        title,
        category,
        projects
    });
};

export {showCategoriesPage, showCategoryPage}