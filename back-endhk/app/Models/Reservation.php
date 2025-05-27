<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    /** @use HasFactory<\Database\Factories\ReservationFactory> */
    use HasFactory;
    protected $table = 'reservations';
    protected $primaryKey = 'id_reservation';
    protected $fillable = [
        'date',
        'heure',
        'duree',
        'id_user',
        'id_local',
    ];
    public $timestamps = true;
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
    public function local()
    {
        return $this->belongsTo(Locaux::class, 'id_local', 'id_local');
    }
    public function factures()
    {
        return $this->hasMany(Factures::class, 'id_reservation', 'id_reservation');
    }
}
