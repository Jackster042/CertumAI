# PowerShell script to backup current database
Write-Host "Starting database backup..." -ForegroundColor Green

# Make sure Docker is running and container is up
docker-compose up -d

# Wait a moment for container to be ready
Start-Sleep -Seconds 5

# Create backup
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "database_backup_$timestamp.sql"

Write-Host "Creating backup: $backupFile" -ForegroundColor Yellow

# Export database (adjust container name and credentials as needed)
docker-compose exec -T db pg_dump -U postgres -d postgres > $backupFile

if (Test-Path $backupFile) {
    Write-Host "✅ Backup created successfully: $backupFile" -ForegroundColor Green
    Write-Host "File size: $((Get-Item $backupFile).Length / 1KB) KB" -ForegroundColor Cyan
} else {
    Write-Host "❌ Backup failed!" -ForegroundColor Red
}

Write-Host "Done!" -ForegroundColor Green