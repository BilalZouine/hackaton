<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locaux extends Model
{
    /** @use HasFactory<\Database\Factories\LocauxFactory> */
    use HasFactory;
    protected $table = 'locaux';
    protected $primaryKey = 'id_local';
    protected $fillable = [
        'type',
        'capacite',
        'prix',
        'location',
    ];
    public $timestamps = true;
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'id_local', 'id_local');
    }
    public function factures()
    {
        return $this->hasMany(Factures::class, 'id_local', 'id_local');
    }
}
