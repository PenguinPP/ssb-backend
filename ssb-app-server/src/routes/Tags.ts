import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import TagDao from "@daos/Tag/TagDao";

const router = Router();
const tagDao = new TagDao();
const { OK, NOT_FOUND } = StatusCodes;

/******************************************************************************
 *                      Get All Tags - "GET /api/tags/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
    const tags = await tagDao.getAll();
    return res.status(OK).json({ tags });
  } catch (error) {
    return res.status(NOT_FOUND).json({ error: error.message });
  }
});

export default router;
