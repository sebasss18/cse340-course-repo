import express from 'express';

import { showHomePage } from './index.js';
import { showNewOrganizationForm, showOrganizationsPage, showOrganizationDetailsPage, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './organizations.js';
import { showProjectsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './projects.js';
import { showCategoriesPage, showCategoryPage, showAssignCategoriesForm, processAssignCategoriesForm } from './categories.js';

import { testErrorPage } from './errors.js';

//import { showOrganizationDetailsPage } from './organizations.js';
import { showProjectDetailsPage } from './projects.js';
// import { getCategoryById } from '../models/categories.js';
//import { processNewOrganizationForm } from './organizations.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

router.get('/test-error', testErrorPage);

router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/edit-project/:projectId', showEditProjectForm);
router.post('/edit-project/:projectId', projectValidation, processEditProjectForm);

export default router;