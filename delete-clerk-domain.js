const https = require('https');
const fs = require('fs');

// Load environment variables from .env.local
function loadEnv() {
  try {
    const envLocal = fs.readFileSync('.env.local', 'utf8');
    const lines = envLocal.split('\n');
    for (const line of lines) {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  } catch (error) {
    console.log('Could not load .env.local file');
  }
}

loadEnv();

// Get your Clerk secret key from environment variables
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

if (!CLERK_SECRET_KEY) {
  console.error('Please set CLERK_SECRET_KEY environment variable');
  process.exit(1);
}

// Function to make API request to delete domain configuration by ID
async function deleteDomainConfiguration(domainId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.clerk.com',
      path: `/v1/domains/${domainId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('Delete Status Code:', res.statusCode);
        console.log('Delete Response:', data);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`API call failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// First, let's list current domains to see what we're working with
async function listDomains() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.clerk.com',
      path: '/v1/domains',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Current domains:', data);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`API call failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  try {
    console.log('Listing current domains...');
    const domainsResponse = await listDomains();
    
    if (domainsResponse && domainsResponse.data && domainsResponse.data.length > 0) {
      const domain = domainsResponse.data[0];
      console.log(`\nFound domain: ${domain.name} (ID: ${domain.id})`);
      console.log('Attempting to delete domain configuration...');
      await deleteDomainConfiguration(domain.id);
      console.log('Domain configuration deleted successfully!');
      console.log('\nYour app should now work at https://certumai.xyz');
      console.log('The sign-in button should be clickable!');
    } else {
      console.log('No custom domains found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();