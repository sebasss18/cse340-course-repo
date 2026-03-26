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

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM service_projects
        WHERE service_projects.organization_id = $1
        ORDER BY date;
      `;
      
      const query_params = [organizationId];
      const result = await db.query(query, query_params);

      return result.rows;
};

const getUpComingProjects = async(number_of_projects) => {
      const query = `
        SELECT
          service_projects.project_id,
          service_projects.organization_id,
          service_projects.title,
          service_projects.description,
          service_projects.location,
          service_projects.date
        FROM service_projects
        JOIN organizations
        ON service_projects.organization_id = organizations.organization_id
        ORDER BY service_projects.date
        LIMIT $1;
      `;

      const query_params = [number_of_projects];
      const result = await db.query(query, query_params);

      return result.rows;
};

const getProjectsDetails = async (id) => {
  const query = `
    SELECT
      service_projects.project_id,
      service_projects.organization_id,
      service_projects.title,
      service_projects.description,
      service_projects.location,
      service_projects.date,
      organizations.name AS organization_name
    FROM service_projects
    JOIN organizations
      ON service_projects.organization_id = organizations.organization_id
    WHERE service_projects.project_id = $1;
  `;

  const query_params = [id];
  const result = await db.query(query, query_params);

  return result.rows[0];
};

const getProjectsByCategory = async (categoryId) => {
  const sql = `
    SELECT
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      sp.date
    FROM service_projects sp
    JOIN project_categories pc
      ON sp.project_id = pc.project_id
    WHERE pc.categories_id = $1
    ORDER BY sp.date;
  `

  const result = await db.query(sql, [categoryId]);
  return result.rows;

};

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
    INSERT INTO service_projects (
      organization_id,
      title,
      description,
      location,
      date
    )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
  `

  const query_params = [
    organizationId,
    title,
    description,
    location,
    date
  ];
  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }
  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id)
  }

  return result.rows[0].project_id;
}

const updateProject = async (projectId, name, description, date, location, organizationId) => {
  const query = `
    UPDATE service_projects
    SET title = $1,
        description = $2,
        location = $3,
        date = $4,
        organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const query_params = [name, description, location, date, organizationId, projectId];

  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Failed to update project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
};

export {getAllProjects, 
  getProjectsByOrganizationId,
   getUpComingProjects,
    getProjectsDetails,
     getProjectsByCategory,
      createProject,
       updateProject};