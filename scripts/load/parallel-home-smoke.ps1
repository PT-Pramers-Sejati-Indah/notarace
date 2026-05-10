# Quick concurrency smoke (not a substitute for k6).
# Usage: pwsh scripts/load/parallel-home-smoke.ps1 -Count 120 -Url https://notarace.id/
param(
  [int]$Count = 120,
  [string]$Url = 'https://notarace.id/'
)

$sw = [Diagnostics.Stopwatch]::StartNew()
# Prefer Node parallel fetch (more reliable than Start-Job + curl on Windows).
$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
  & node "$PSScriptRoot/parallel-fetch.mjs" $Url $Count
  exit $LASTEXITCODE
}

$jobs = foreach ($i in 1..$Count) {
  Start-Job -ScriptBlock {
    param($u)
    $out = & curl.exe -sL -o $null -w '%{time_total}' $u 2>$null
    [double](("$out").Trim())
  } -ArgumentList $Url
}
$jobs | Wait-Job | Out-Null
$times = foreach ($j in $jobs) {
  $raw = Receive-Job -Job $j
  if ($raw -is [array]) { [double]$raw[-1] } else { [double]$raw }
}
$sw.Stop()
$jobs | Remove-Job

$nums = @($times | Sort-Object)
$n = $nums.Count
if ($n -eq 0) { Write-Error 'No timings'; exit 1 }
$p95i = [Math]::Max(0, [int]([Math]::Ceiling(0.95 * $n) - 1))
$midi = [int]([Math]::Floor($n / 2))

Write-Host "URL:          $Url"
Write-Host "Parallel:     $Count"
Write-Host "Wall_clock_s: $([math]::Round($sw.Elapsed.TotalSeconds, 2))"
Write-Host "Min_s:        $([math]::Round($nums[0], 3))"
Write-Host "Median_s:     $([math]::Round($nums[$midi], 3))"
Write-Host "P95_s:        $([math]::Round($nums[$p95i], 3))"
Write-Host "Max_s:        $([math]::Round($nums[$n - 1], 3))"
