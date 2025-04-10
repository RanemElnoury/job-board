<?php
namespace App\Http\Controllers;

use App\Models\JobPost; // تأكد من استيراد الموديل الجديد
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    public function index()
    {
        return JobPost::with('company')->get();
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $company = $user->company;

        // التحقق من أن المستخدم هو صاحب الشركة
        if (!$company) {
            return response()->json(['error' => 'Only company users can create jobs'], 403);
        }

        // التحقق من صحة المدخلات
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'salary' => 'nullable|numeric',
            'location' => 'nullable|string',
        ]);

        // إنشاء وظيفة جديدة في جدول job_posts
        $jobPost = $company->jobPosts()->create([  // استخدام jobPosts بدلاً من jobs
            'title' => $request->title,
            'description' => $request->description,
            'salary' => $request->salary,
            'location' => $request->location,
        ]);

        return response()->json($jobPost, 201);  // إرجاع الوظيفة الجديدة
    }
}
