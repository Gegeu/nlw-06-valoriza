import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";


class ListTagsConntroller {
    async handle(request: Request, response: Response) {
        const listTagsService = new ListTagsService();

        const tags = await listTagsService.execute();

        return response.json(tags);
    }
}

export { ListTagsConntroller };