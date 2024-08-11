<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Http\Filters\QueryFilter;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class LabsData extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'status' , 'user_id'];

    public function author():BelongsTo {
        return $this->belongsTo(User::class,'user_id');
    }

    
    public function scopeFilter(Builder $builder, QueryFilter $filters){
        return $filters->apply($builder);
    }
}
