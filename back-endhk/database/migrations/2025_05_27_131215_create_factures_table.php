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
        Schema::create('factures', function (Blueprint $table) {
            $table->id("id_facture");
            $table->decimal("montant", 10, 2);
            $table->date("date_creation");
            $table->enum("status", ["payé", "non payé"])->default("non payé");
            $table->unsignedBigInteger("id_reservation");
            $table->unsignedBigInteger("id_local");
            $table->unsignedBigInteger("id_user");
            $table->foreign("id_reservation")->references("id_reservation")->on("reservations")->onDelete("cascade");
            $table->foreign("id_local")->references("id_local")->on("locauxes")->onDelete("cascade");
            $table->foreign("id_user")->references("id")->on("users")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};
