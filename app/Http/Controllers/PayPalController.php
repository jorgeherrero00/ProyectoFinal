<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Illuminate\Support\Facades\Log;

class PayPalController extends Controller
{
    public function createOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $order = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal.success'),
                "cancel_url" => route('paypal.cancel'),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => "100.00" // Reemplazar con la cantidad real
                    ]
                ]
            ]
        ]);

        return response()->json($order);
    }

    public function captureOrder(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $capture = $provider->capturePaymentOrder($request->input('orderID'));

        return response()->json($capture);
    }

    public function success(Request $request)
    {
        return view('paypal.success');
    }

    public function cancel(Request $request)
    {
        return view('paypal.cancel');
    }
}
