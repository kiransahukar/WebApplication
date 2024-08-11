<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Filters\QueryFilter;
use Illuminate\Contracts\Database\Query\Builder;

class CourseDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'course_id',
        'session_no',
        'session_name'
    ];


    public function course():BelongsTo {
        return $this->belongsTo(Course::class,'course_id');
    }
    public function scopeFilter(Builder $builder, QueryFilter $filters) {
        return $filters->apply($builder);
    }
    
    
}
