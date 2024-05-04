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
        Schema::create('order', function (Blueprint $table) {
            $table->increments('id_order');
            $table->integer('customer_id')->unsigned();
            $table->foreign('customer_id')->references('id_customer')->on('users');
            $table->dateTime('order_date');
            $table->string('items', 45);
            $table->float('price');
            $table->string('address', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order');
    }
};
