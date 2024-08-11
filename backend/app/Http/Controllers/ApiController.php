<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Policies\TicketPolicy;
use Illuminate\Http\Request;
use App\Traits\ApiResponses;


class ApiController extends Controller
{   

    use ApiResponses;
    protected $policyClass;

    public function include(string $relationship): bool {

        $param = request()->get('include');
        if(!isset($param)) {
            false;
        }

        $includeValues=explode(',',strtolower($param));

        return in_array(strtolower($relationship), $includeValues);
    }


    public function isAble($ability, $targetModel) {
        return $this->authorize($ability, [$targetModel, $this->policyClass]);
    }
}
