import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage } from './projects.js';
import { showCategoriesPage, showCategoryPage } from './categories.js';

import { testErrorPage } from './errors.js';

import { showOrganizationDetailsPage } from './organizations.js';
import { showProjectDetailsPage } from './projects.js';
// import { getCategoryById } from '../models/categories.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

router.get('/test-error', testErrorPage);

router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryPage);

export default router;