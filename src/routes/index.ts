import express from 'express';
import usuariosRouter from './usuarios/usuariosRoutes';
import noticiasRouter from './noticias/noticiasRoutes';
const router = express.Router();

// Rutas de cada controlador
router.use('/usuarios', usuariosRouter);
router.use('/noticias', noticiasRouter);

export default router;