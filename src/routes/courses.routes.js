import { Router } from "express";
const router = Router()

router.get('/courses', (req, res) => res.json('get products'))

export default router