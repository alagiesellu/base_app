<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Alagie Sellu',
            'email' => 'alagiesellu@gmail.com',
            'password' => bcrypt('password'),
            'roles' => array_keys(config('data.roles'))
        ]);

         \App\Models\User::factory(10)->create();
    }
}
