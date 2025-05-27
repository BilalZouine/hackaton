<?php

namespace App\Http\Controllers;

use App\Models\Factures;
use App\Models\Locaux;
use Illuminate\Http\Request;

class LocauxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Locaux::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $local=$request->validate([
            "type"=>"required",
            "capacite"=>"required",
            "prix"=>"required",
            "location"=>"required",
            "status"=>"required",
        ]);
        Locaux::create($local);
        return response()->json($local);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $local=Locaux::findOrFail($id);
        return response()->json($local);
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $rse=Locaux::findOrFail($id);
            $reservation=$request->validate([
            "type"=>"required",
            "capacite"=>"required",
            "prix"=>"required",
            "location"=>"required",
            "status"=>"required",
        ]);
        $rse->update($reservation);
        return response()->json($reservation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Locaux::destroy($id);
        return response()->json(["message"=>"bien supprimer"]);
    }
}
