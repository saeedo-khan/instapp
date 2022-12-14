import { Router } from "express";
import { findSearchResult } from "../controllers/search/findSearchResult";

const router = Router();

router.get("/", findSearchResult)


export default router;