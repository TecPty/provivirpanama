import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'provivir_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: false
});

// GET /api/social-posts
router.get('/', async (req, res) => {
  try {
    const { platform, limit = 10 } = req.query;
    
    let query = 'SELECT * FROM social_posts WHERE is_active = 1';
    const params = [];

    if (platform) {
      query += ' AND platform = ?';
      params.push(platform);
    }

    query += ' ORDER BY is_trending DESC, created_at DESC LIMIT ?';
    params.push(parseInt(limit));

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, params);
    connection.release();

    // Format response
    const formattedRows = rows.map(row => ({
      ...row,
      is_trending: Boolean(row.is_trending),
      is_active: Boolean(row.is_active),
      likes_count: parseInt(row.likes_count),
      comments_count: parseInt(row.comments_count)
    }));

    res.json({
      success: true,
      data: formattedRows,
      count: formattedRows.length
    });

  } catch (error) {
    console.error('Error fetching social posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch social posts',
      message: error.message
    });
  }
});

// GET /api/social-posts/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM social_posts WHERE id = ?',
      [id]
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    const post = rows[0];
    res.json({
      success: true,
      data: {
        ...post,
        is_trending: Boolean(post.is_trending),
        is_active: Boolean(post.is_active)
      }
    });

  } catch (error) {
    console.error('Error fetching social post:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch social post',
      message: error.message
    });
  }
});

// POST /api/social-posts (Create)
router.post('/', async (req, res) => {
  try {
    const { platform, post_id, image_url, caption, likes_count, comments_count, post_url, is_trending, display_order } = req.body;

    if (!platform || !image_url || !post_url) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: platform, image_url, post_url'
      });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO social_posts (platform, post_id, image_url, caption, likes_count, comments_count, post_url, is_trending, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [platform, post_id || null, image_url, caption || '', likes_count || 0, comments_count || 0, post_url, is_trending || false, display_order || 0]
    );
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      id: result.insertId
    });

  } catch (error) {
    console.error('Error creating social post:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create social post',
      message: error.message
    });
  }
});

export default router;
