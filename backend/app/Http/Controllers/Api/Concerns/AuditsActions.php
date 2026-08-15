<?php

namespace App\Http\Controllers\Api\Concerns;

use App\Models\AuditLog;
use Illuminate\Http\Request;

trait AuditsActions
{
    protected function audit(Request $request, string $action, array $meta = []): void
    {
        AuditLog::create([
            'user_id'    => $request->user()?->id,
            'action'     => $action,
            'meta'       => $meta,
            'ip_address' => $request->ip(),
        ]);
    }
}
