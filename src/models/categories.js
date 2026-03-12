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

export { getAllCategories }