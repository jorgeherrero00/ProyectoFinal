<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_product';
    protected $fillable = ['category_id', 'name', 'description', 'price', 'stock', 'image_path'];
    public function reviews()
    {
        return $this->hasMany(Reviews::class, 'order_id', 'id_product');
    }
}
