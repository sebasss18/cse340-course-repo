import { getAllCategories, getCategoryById, getCategoriesByServiceProjectId, updateCategoryAssignments, createCategory, updateCategory } from "../models/categories.js";
import { getProjectsByCategory, getProjectsDetails } from "../models/projects.js";
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('c_name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 255 }).withMessage('Category name must be less than 255 characters')
];

export { categoryValidation };

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

const showNewCategoriesForm = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Add new category';

    res.render('new-category', {title});
};

const processNewCategoriesForm = async (req, res) => {
    const { c_name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    try {
        const newCategoryId = await createCategory(c_name)

        req.flash('success', 'New category created successfully!');
        res.redirect(`/category/${newCategoryId}`);
    } catch (error) {
        console.error('error creating new category:', error);
        req.flash('error', 'There was an error creating the category');
        res.redirect('/new-category');
    }

};

const showEditCategoriesForm = async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);

    const title = 'Edit Category';

    res.render('edit-category', { title, category });
};

const processEditCategoriesForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-category/' + req.params.categoryId);
    }

    const categoryId = req.params.categoryId;
    const { c_name } = req.body;

    await updateCategory(categoryId, c_name);

    req.flash('success', 'Category updated successfully');
    res.redirect(`/category/${categoryId}`);
};

export {showCategoriesPage, showCategoryPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoriesForm, processNewCategoriesForm, showEditCategoriesForm, processEditCategoriesForm}