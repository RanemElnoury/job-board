<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_name', 'description', 'location', 'user_id'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function jobPosts()
    {
        return $this->hasMany(JobPost::class);  // علاقة مع job_posts
    }
}

