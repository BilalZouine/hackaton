<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id("id_reservation");
            $table->date("date");
            $table->time("heure");
            $table->integer("duree");
            $table->unsignedBigInteger("id_user");
            $table->unsignedBigInteger("id_local");
            $table->foreign("id_user")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("id_local")->references("id_local")->on("locauxes")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
