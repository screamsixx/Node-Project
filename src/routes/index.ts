import express from 'express';
import usuariosRouter from './usuarios/usuariosRoutes';
import noticiasRouter from './noticias/noticiasRoutes';
import authRouter from './auth/authRoutes';
const router = express.Router();

// Rutas de cada controlador
router.use('/usuarios', usuariosRouter);
router.use('/noticias', noticiasRouter);
router.use('/auth', authRouter);

export default router;