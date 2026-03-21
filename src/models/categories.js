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

export { getAllCategories, getCategoryById }