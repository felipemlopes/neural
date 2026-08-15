<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@neuralcapital.com'],
            [
                'full_name' => 'Admin Neural Capital',
                'password'  => Hash::make('NeuralAdmin@2026'),
                'role'      => 'admin',
            ]
        );
    }
}
