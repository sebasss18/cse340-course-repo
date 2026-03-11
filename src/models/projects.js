import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT project_id, organization_id, title, description, location, date
        FROM public.service_projects
        ORDER BY date;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllProjects }