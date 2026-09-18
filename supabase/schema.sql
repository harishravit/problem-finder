-- DevSolve (ProblemHub) Supabase PostgreSQL Database Schema

-- Enable UUID Extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Synced with Clerk Authentication)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY, -- Clerk User ID (e.g., user_2N...)
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Posts Table (Problem Statements)
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Web Dev, Mobile, AI/ML, DevOps, Data Science, Cyber Security
    difficulty VARCHAR(20) DEFAULT 'Medium', -- Beginner, Medium, Advanced
    problem_statement TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open', -- open, solved
    upvotes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Solutions Table (Submitted by Solvers)
CREATE TABLE IF NOT EXISTS solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    author_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    repo_link TEXT NOT NULL,
    live_demo_link TEXT,
    writeup TEXT NOT NULL,
    upvotes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Comments Table (Discussion & Nested Replies)
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    author_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- Null for root comments, UUID of parent comment for nested replies
    content TEXT NOT NULL,
    upvotes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Upvotes Table (Prevents Self-Upvoting & Duplicate Upvoting)
CREATE TABLE IF NOT EXISTS upvotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(20) NOT NULL, -- 'POST', 'SOLUTION', 'COMMENT'
    target_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_target UNIQUE (user_id, target_type, target_id)
);

-- 6. Saved Posts (Bookmarks) Table
CREATE TABLE IF NOT EXISTS saved_posts (
    user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_solutions_post_id ON solutions(post_id);
CREATE INDEX IF NOT EXISTS idx_solutions_upvotes ON solutions(upvotes_count DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_upvotes_user_target ON upvotes(user_id, target_type, target_id);
