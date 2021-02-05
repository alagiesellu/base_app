<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return User::paginate();
    }

    public function password(Request $request)
    {
        User::findOrFail($request->user()->id)->update([
            'password' => bcrypt($request['password'])
        ]);

        return my_success_response('Your password successfully updated.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['password'] = bcrypt('password');
        User::create($request->toArray());

        return my_success_response('User record successfully stored.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|\Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::query();

        if (\request()['includes'])
            $user->with(\request()['includes']);

        return $user->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        User::findOrFail($id)->update($request->toArray());

        return my_success_response('User record successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return my_success_response('User record successfully deleted.');
    }
}
