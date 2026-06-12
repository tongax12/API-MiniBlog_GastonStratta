const pool = require('../../db/config');
const { loadEnvFile } = require('node:process');
loadEnvFile('.env');
const express = require('express');
const router = express.Router();
import { createError } from '../../errors';