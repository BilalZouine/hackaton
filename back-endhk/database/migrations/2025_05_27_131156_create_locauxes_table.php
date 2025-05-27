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
        Schema::create('locauxes', function (Blueprint $table) {
            $table->id("id_local");
            $table->string("type");
            $table->integer("capacite");
            $table->decimal("prix", 10, 2);
            $table->string("location");
            $table->unsignedBigInteger("id_category");
            $table->foreign("id_category")->references("id")->on("categories")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locauxes');
    }
};
