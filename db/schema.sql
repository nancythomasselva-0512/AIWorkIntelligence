-- Dynamic Work Intelligence Platform Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'employee', -- admin, manager, employee, consultant
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Organizations
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    gst_number VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Organization Mapping
CREATE TABLE user_organizations (
    user_id UUID REFERENCES users(id),
    org_id UUID REFERENCES organizations(id),
    role VARCHAR(50),
    PRIMARY KEY (user_id, org_id)
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    type VARCHAR(100), -- software, consulting, innovation, government
    budget NUMERIC(15, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Work Logs (AI Voice-to-Task captured data)
CREATE TABLE work_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    project_id UUID REFERENCES projects(id) NULL,
    org_id UUID REFERENCES organizations(id) NULL,
    original_audio_url VARCHAR(500),
    transcribed_text TEXT NOT NULL,
    ai_summary TEXT,
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'logged',
    priority VARCHAR(20) DEFAULT 'medium',
    is_revenue_generating BOOLEAN DEFAULT FALSE,
    logged_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI Tags Mapping
CREATE TABLE work_log_tags (
    log_id UUID REFERENCES work_logs(id),
    tag VARCHAR(100),
    PRIMARY KEY (log_id, tag)
);

-- Revenue & Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id),
    project_id UUID REFERENCES projects(id) NULL,
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    amount_excluded NUMERIC(15, 2) NOT NULL,
    gst_percentage NUMERIC(5, 2) DEFAULT 18.00,
    gst_amount NUMERIC(15, 2) NOT NULL,
    total_amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft', -- draft, sent, paid
    issued_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dynamic Modules (For Admin customization)
CREATE TABLE dynamic_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    schema_json JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);
