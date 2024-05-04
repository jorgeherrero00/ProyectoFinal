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
        Schema::create('product', function (Blueprint $table) {
            $table->increments('id_product');
            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id_category')->on('category');
            $table->string('name', 45);
            $table->string('description', 45);
            $table->float('price');
            $table->integer('stock');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};