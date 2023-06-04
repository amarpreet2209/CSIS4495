import {Category} from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;

    await mongooseConnect();

    if (method === 'POST') {
        const {name, parentCategory} = req.body;
        const categoryDoc = await Category.create({
            name,
            parent: parentCategory
        });
        res.json(categoryDoc);
    }

    if (method === 'GET') {
        res.json(await Category.find({}));
    }
}
