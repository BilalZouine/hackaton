<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Category.php
class Category extends Model
{
    protected $fillable = ['name', 'slug', 'description'];
    
    public function locauxes()
    {
        return $this->hasMany(Locaux::class,"id_local");
    }
}

