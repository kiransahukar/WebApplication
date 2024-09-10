<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Contracts\Database\Query\Builder;

class EnrolledStaff extends Model
{
    use HasFactory;
    protected $fillable = [
        'course_id',
        'user_id',
    ];
    public function course():BelongsTo {
        return $this->belongsTo(Course::class,'course_id');
    }
   
    public function scopeFilter(Builder $builder, QueryFilter $filters) {
        return $filters->apply($builder);
    }
}
