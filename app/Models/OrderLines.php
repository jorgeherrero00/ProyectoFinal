<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderLines extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = ['order_id', 'product_name', 'quantity', 'price'];

    protected $table = 'order_line';

}
