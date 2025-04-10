<?php

namespace App\Http\Controllers;

use App\Events\JobApplied;
use App\Models\Application;
use App\Models\Job;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ApplicationController extends Controller
{

    public function store(Request $request)
    {
        try {
            $request->validate([
                'job_id' => 'required|exists:jobs_posts,id',
                'status' => 'nullable|in:pending,accepted,rejected',
            ]);

            $user = Auth::user();
            $job = JobPost::findOrFail($request->job_id);

            $application = Application::create([
                'user_id' => $user->id,
                'job_id' => $job->id,
                'cover_letter' => $request->cover_letter,
                'status' => $request->status ?? 'pending',
            ]);
            Log::info("Broadcasting event JobApplied", ['jobId' => $job->id, 'userName' => $user->name]);
            Log::info("Event Data", ['jobId' => $job->id, 'userName' => $user->name]);
            broadcast(new JobApplied($job->id, $user->name));

            Log::info("Event Broadcasted");


            return response()->json($application, 201);
        } catch (\Exception $e) {
            Log::error("Application Store Error: " . $e->getMessage());
            return response()->json(['error' => 'Server Error', 'details' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        $user = Auth::user();

        $applications = $user->applications; 

        return response()->json($applications);
    }
}
