import { getAllCategories, getCategoryById, getCategoriesByServiceProjectId, updateCategoryAssignments } from "../models/categories.js";
import { getProjectsByCategory, getProjectsDetails } from "../models/projects.js";

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    
    const projectDetails = await getProjectsDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};


export {showCategoriesPage, showCategoryPage, showAssignCategoriesForm, processAssignCategoriesForm}