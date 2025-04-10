<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow; 
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;

class JobApplied implements ShouldBroadcastNow 
{
    public $jobId;
    public $userName;

    public function __construct($jobId, $userName)
    {
        $this->jobId = $jobId;
        $this->userName = $userName;
    }

    public function broadcastOn()
    {
        return new Channel('job.' . $this->jobId);
    }

    public function broadcastAs()
    {
        return 'JobApplied';
    }

    public function broadcastWith()
    {
        return [
            'jobId' => $this->jobId,
            'userName' => $this->userName,
        ];
    }
}