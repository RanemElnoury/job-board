<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('job.{jobId}', function ($user, $jobId) {
    return true; 
});
