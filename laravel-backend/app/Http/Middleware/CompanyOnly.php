<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompanyOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->type !== 'company') {
            return response()->json([
                'message' => 'Only company users can perform this action.'
            ], 403);
        }

        return $next($request);
    }
}

