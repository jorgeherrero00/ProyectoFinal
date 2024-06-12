<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_category';
    protected $fillable = ['name', 'description', 'photo'];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id_category');
    }
}
