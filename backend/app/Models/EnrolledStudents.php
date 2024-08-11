<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Contracts\Database\Query\Builder;
class EnrolledStudents extends Model
{
    use HasFactory;


    public function course():BelongsTo {
        return $this->belongsTo(Course::class,'course_id');
    }
   
    public function courseDetails(): HasMany {
        return $this->hasMany(CourseDetails::class);
    }
    public function scopeFilter(Builder $builder, QueryFilter $filters) {
        return $filters->apply($builder);
    }
}
