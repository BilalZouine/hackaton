<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('locauxes', function (Blueprint $table) {
        $table->enum('status', ['disponible', 'nondisponible'])->default('disponible');
    });
}

public function down()
{
    Schema::table('locauxes', function (Blueprint $table) {
        $table->dropColumn('status');
    });
}

};
