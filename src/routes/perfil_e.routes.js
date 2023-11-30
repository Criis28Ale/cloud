import { Router } from "express";
import { createPerfilE, getPerfilE, getPerfilE_by, getPerfilE_byCor } from '../controllers/perfil_e.controllers.js'
import { createPropuesta, deletePropuesta, getPropuesta, getPropuesta_byEnom, getPropuesta_byTit } from "../controllers/Propuestas.controllers.js";
import { createFormularios, deleteFormularios, getFormulario_byTit } from "../controllers/Formularios.controllers.js";
import { createPerfilP, getPerfilP_by, getPerfilP_byCor } from "../controllers/Perfil_P.controllers.js";
import { createAplica, getA_byPcor, getAplica_byPcor, getAplica_byTit, pb, updateAplica } from "../controllers/Aplica..controllers.js";
import { createRespuestaF, getResF_byPcor, getRespuestaF_byTit } from "../controllers/RepondeF.controllers.js";
import { cerateCursos, deleteCurso, getCursos, getCursos_byCnom } from "../controllers/Curso.controllers.js";
import { createAsigna, deleteAsigna, getAsigna_byC, getAsigna_byCnom, getAsigna_byPcor, updateAsigna } from "../controllers/Asigna.controllers.js";
import { createClases, getClases_byCnom, getClases_byIdC, getClass } from "../controllers/Clases.controllers.js";
import { creaeteInfo, getInfo } from "../controllers/Informacion.controllers.js";
import { createCuestionario, deleteCuestionario, getCuestionario_byCid } from "../controllers/Cuestionario.controllers.js";
import { createRespuestaC, deleteResC, getResC_byCid, getResC_byPcor, updateResC } from "../controllers/RespondeC.controllers.js";

const router = Router()

//Rutas para tabla Perfil_E
router.get('/getPerfilE', getPerfilE)                   //Llamar a todos los Perfiles_E
router.post('/createPE', createPerfilE)                             //Crear un Perfil_E
router.get('/getPerfilE_by/:enom', getPerfilE_by)                   //Llamar a un Perfil_E en especifico
router.get('/getPerfilE_byCor/:ecor/:pass', getPerfilE_byCor)       //Comprobar si existe Usuario

//Rutas para tabla Propuestas
router.get('/getPro', getPropuesta)                                 //Llamar a todas las Propuestas
router.post('/createPro', createPropuesta)                          //Crear una Propuesta
router.get('/getPro_byEnom/:enom', getPropuesta_byEnom)             //Llamar a todas las Propuestas de una Empresa
router.get('/getPro_byTit/:enom/:tit', getPropuesta_byTit)          //Llamar a una Propuesta por Titulo
router.delete('/deletePro/:enom/:tit', deletePropuesta)             //Eliminar una Propuesta

//Rutas para la tabla Formularios
router.get('/getForm_byTit/:enom/:tit', getFormulario_byTit)        //Llamar a un Formulario por Titulo
router.post('/createForm', createFormularios)                       //Crear un Formulario
router.delete('/deleteForm/:enom/:tit/:id', deleteFormularios)      //Eliminar una pregunta de un Formulario

//Rutas para la tabla Perfil_P
router.get('/getPP_by/:cor', getPerfilP_by)                         //Llamar a un PerfilP en especifico
router.post('/createPP', createPerfilP)                             //Crear un Perfil personal
router.get('/getPP_byComp/:cor/:pass', getPerfilP_byCor)            //Comprueba que exista el perfil personal

//Rutas para la tabla Aplica
router.get('/getA_byTit/:enom/:tit', getAplica_byTit)               //Llamar a los que Aplican por Propuesta
router.get('/getA_byPcor/:enom/:tit/:pcor', getAplica_byPcor)       //Llamar a uno que Aplica en concreto
router.post('/createA', createAplica)                               //Alguien Aplica a Propuesta
router.post('/updateA', updateAplica)                               //Alguien fue aprobado o rechazado   
router.get('/getA_byPcor/:pcor', getA_byPcor)                       //Llamar a las Propuestas aplicadas  

//Rutas para la tabla RespondeF
router.post('/createResF', createRespuestaF)                        //Guardar una respuesta
router.get('/getResF_byTit/:enom/:tit/:id', getRespuestaF_byTit)    //Traer las respuesta de un Formulario
router.get('/getResF_byPcor/:enom/:tit/:pcor', getResF_byPcor)      //Comprobar si ya respondio

//Rutas para la tabla Cursos
router.get('/getCursos', getCursos)                                 //Llamar a todos los cursos
router.get('/getCursos_by/:cnom', getCursos_byCnom)                 //Llamar a un Curso en especifico
router.post('/createCurso', cerateCursos)                           //Crear un Curso
router.delete("/deleteCurso/:cnom", deleteCurso)                    //Eliminar un Curso

//Rutas para la tabla Asigna
router.get('/getAsig_byPC/:pcor/:cnom', getAsigna_byPcor)           //Llamara una persona asignada a cierto curso
router.get('/getAsig_byCN/:cnom', getAsigna_byCnom)                 //Llamara a todos los asignados a un curso
router.post('/createAsig', createAsigna)                            //Asignar a alguien a un curso
router.get("/updateAsig/:pcor/:cnom/:est", updateAsigna)            //Actualizar estado del curso
router.delete('/delteAsig/:pcor/:cnom', deleteAsigna)               //Desasignar Curso
router.get('/getAsig_byC/:pcor', getAsigna_byC)

//Rutas para la tabla Clases
router.get('/getCL_byCN/:cnom/:pcor', getClases_byCnom)             //Llamara a las clases de un usuario
router.get('/getCL_byIDC/:cnom/:id', getClases_byIdC)               //Llamara a una clase en especifico
router.post('/createCL', createClases)                              //Crear una clase a un curso
router.get('/getClas/:cnom', getClass)                              //Clase para llamar a las clases de un curso

//Rutas para la tabla Informacion
router.get('/getInfo/:cnom/:cid',getInfo)                           //Llamar a la Informacion de una clase
router.post('/createInfo', creaeteInfo)                             //Guardar Informacion

//Rutas para la tabla Cuestionario
router.get('/getCuest_byCid/:cnom/:cid', getCuestionario_byCid)      //Llamara las preguntas de un cuestionario
router.post('/createCuest', createCuestionario)                      //Crear un cuestionario
router.delete('/deleteCuest/:cnom/:cid/:numc', deleteCuestionario)   //Eliminar una pregunta del cuestionario

//Rutas para la tabla RespondeC
router.post('/createResC', createRespuestaC)                         //Guardar respuesta
router.get('/getResC_byPcor/:cnom/:cid/:pcor', getResC_byPcor)       //Ver las respuesta de un usuario
router.get('/getResC_byCid/:cnom/:cid', getResC_byCid)               //Ver todas las respuestas al cuestionario
router.post('/updateResC', updateResC)                               //Cambiar el valor de estado
router.delete('/deletResC/:cnom/:cid/:pcor', deleteResC)             //Volver a hacer el Cuestionario


export default router