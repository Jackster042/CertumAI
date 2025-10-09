const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = colors.reset) {
  console.log(color + message + colors.reset);
}

async function migrateToNeon() {
  log('🚀 Starting migration to Neon...', colors.blue);
  
  // Check if DATABASE_URL is set
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    log('❌ DATABASE_URL environment variable is not set!', colors.red);
    log('Please set your Neon connection string as DATABASE_URL', colors.yellow);
    process.exit(1);
  }
  
  log('✅ DATABASE_URL found', colors.green);
  
  // Run Drizzle migrations
  log('📋 Running database migrations...', colors.blue);
  
  try {
    // Generate migrations if needed
    await runCommand('npm run db:generate');
    log('✅ Migrations generated', colors.green);
    
    // Push to database
    await runCommand('npm run db:migrate');
    log('✅ Database migrated successfully!', colors.green);
    
    log('🎉 Migration completed! Your database is ready on Neon.', colors.green);
    
  } catch (error) {
    log('❌ Migration failed:', colors.red);
    log(error.message, colors.red);
    process.exit(1);
  }
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      log(stdout);
      if (stderr) log(stderr, colors.yellow);
      resolve();
    });
  });
}

// Run migration
migrateToNeon();