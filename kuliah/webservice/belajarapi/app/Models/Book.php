<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable=[
        'title',
        'author'
    ];
}
