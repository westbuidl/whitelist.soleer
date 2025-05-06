// scripts/setup-db.ts
import { execSync } from 'child_process';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

function executeCommand(command: string) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    throw error;
  }
}

async function main() {
  console.log('🚀 Setting up database...');

  // Start Docker containers
  console.log('📦 Starting Docker containers...');
  executeCommand('docker-compose up -d');

  // Wait for PostgreSQL to be ready
  console.log('⏳ Waiting for PostgreSQL to be ready...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  executeCommand('npx prisma generate');

  // Push schema changes
  console.log('📤 Pushing schema changes...');
  executeCommand('npx prisma db push');

  console.log('✅ Database setup complete!');
}

main().catch(error => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});