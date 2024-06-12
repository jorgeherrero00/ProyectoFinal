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
        Schema::create('order_line', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id')->unsigned();
            $table->foreign('order_id')->references('id_order')->on('order')->onDelete('cascade');
            $table->string('product_name', 150);
            $table->integer('quantity');
            $table->float('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_line');
    }
};
