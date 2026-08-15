<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'site_name'          => 'Neural Capital',
            'support_email'      => 'suporte@neuralcapital.com',
            'timezone'           => 'America/Sao_Paulo',
            'base_currency'      => 'BRL',
            'email_notifications' => '1',
            'two_factor_auth'     => '0',
            'maintenance_mode'    => '0',
            'access_logs'         => '1',
        ];

        foreach ($defaults as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
