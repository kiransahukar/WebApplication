<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Filters\QueryFilter;
use Illuminate\Contracts\Database\Query\Builder;


class Course extends Model
{
    use HasFactory;

    protected $fillable = ['course_name'];

    public function courseDetails(): HasMany {
        return $this->hasMany(CourseDetails::class);
    }
    public function enrolledStudens(): BelongsTo {
        return $this->belongsTo(EnrolledStudents::class);
    }
    
    public function scopeFilter(Builder $builder, QueryFilter $filters) {
        return $filters->apply($builder);
    }
}
