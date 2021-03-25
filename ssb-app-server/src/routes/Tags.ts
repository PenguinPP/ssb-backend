import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import TagDao from "@daos/Tag/TagDao";
import { paramMissingError, IRequest } from "@shared/constants";
import { param } from 'express-validator';

const router = Router();
const tagDao = new TagDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/******************************************************************************
 *                      Get All Tags - "GET /api/tags/all"
 ******************************************************************************/

 router.get("/all", async (req: Request, res: Response) => {
    const tags = await tagDao.getAll();
    return res.status(OK).json({ tags });
  });


export default router;