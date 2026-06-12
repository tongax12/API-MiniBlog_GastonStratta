const pool = require('../../db/config');
const { loadEnvFile } = require('node:process');
loadEnvFile('.env');
const express = require('express');
const router = express.Router();
import { createError } from '../../errors';
const app = express();

app.use(express.json());

router.get('/', async (req,res)=>{
    try{
        const authorList = await pool.query('SELECT * FROM authors');
        res.json(result.rows);
    } catch (error) { 
        console.error('')
    }

})