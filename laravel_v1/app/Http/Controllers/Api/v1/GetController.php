<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetController extends Controller
{

    public function configs()
    {
        return response()->json([
            'roles' => config('data.roles'),
        ]);
    }
}
