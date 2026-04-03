import express from 'express';
import { validationResult } from 'express-validator';

// Home
import { showHomePage } from './index.js';

// Organizations
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
  organizationValidation
} from './organizations.js';

// Projects
import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  projectValidation
} from './projects.js';

// Categories
import {
  showCategoriesPage,
  showCategoryPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoriesForm,
  processNewCategoriesForm,
  showEditCategoriesForm,
  processEditCategoriesForm,
  categoryValidation
} from './categories.js';

// Users
import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard,
  requireRole,
  showAllUsers
} from './users.js';

// Errors
import { testErrorPage } from './errors.js';
const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

router.get('/test-error', testErrorPage);

router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryPage);

// ORGANIZATIONS
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// PROJECTS
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/edit-project/:projectId', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:projectId', requireRole('admin'), projectValidation, processEditProjectForm);

// CATEGORIES
router.get('/new-category', requireRole('admin'), showNewCategoriesForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoriesForm);

router.get('/edit-category/:categoryId', requireRole('admin'), showEditCategoriesForm);
router.post('/edit-category/:categoryId', requireRole('admin'), categoryValidation, processEditCategoriesForm);

router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// AUTH
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/users', requireRole('admin'), showAllUsers);

// DASHBOARD
router.get('/dashboard', requireLogin, showDashboard);
export default router;