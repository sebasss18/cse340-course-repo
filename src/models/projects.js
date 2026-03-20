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

export {getAllProjects, getProjectsByOrganizationId, getUpComingProjects, getProjectsDetails};