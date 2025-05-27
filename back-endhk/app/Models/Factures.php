<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factures extends Model
{
    /** @use HasFactory<\Database\Factories\FacturesFactory> */
    use HasFactory;
    protected $table = 'factures';
    protected $primaryKey = 'id_facture';
    protected $fillable = [
        'montant',
        'date_creation',
        'status',
        'id_reservation',
        "id_local",
        'id_user',
    ];
    public $timestamps = true;
    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'id_reservation', 'id_reservation');
    }
    public function local()
    {
        return $this->belongsTo(Locaux::class, 'id_local', 'id_local');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
