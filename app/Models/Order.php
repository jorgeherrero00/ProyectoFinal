<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_order';
    protected $fillable = ['customer_id', 'items', 'price', 'address', 'status'];

    protected $table = 'order';

}
