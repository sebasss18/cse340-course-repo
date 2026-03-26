import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT categories_id, c_name
        FROM public.categories
        ORDER BY c_name;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (id) => {
    const query = `
        SELECT categories_id, c_name
        FROM public.categories
        WHERE categories_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows[0];
    
}

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO project_categories (project_id, categories_id)
        VALUES ($1, $2)
    `;

    await db.query(query, [projectId, categoryId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
}

const getCategoriesByServiceProjectId = async (projectId) => {
    const query = `
        SELECT c.categories_id, c.c_name
        FROM public.categories c
        JOIN project_categories pc
            ON c.categories_id = pc.categories_id
        WHERE pc.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
}

export { getAllCategories, getCategoryById, updateCategoryAssignments, getCategoriesByServiceProjectId }