<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
    
        if ($user->type !== 'company') {
            return response()->json(['error' => 'Only company users can create companies'], 403);
        }
    
        $request->validate([
            'company_name' => 'required|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
        ]);
    
        $company = Company::create([
            'company_name' => $request->company_name,
            'description' => $request->description,
            'location' => $request->location,
            'user_id' => $user->id,
        ]);
    
        return response()->json($company, 201);
    }
    
}
