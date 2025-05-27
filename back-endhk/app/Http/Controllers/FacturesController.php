<?php

namespace App\Http\Controllers;

use App\Models\Factures;
use Illuminate\Http\Request;

class FacturesController extends Controller
{
   public function index()
    {
        return response()->json(Factures::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $facture=$request->validate([
            "montant"=>"required",
            "date_creation"=>"required",
            "status"=>"required",
            "id_reservation"=>"required|exists:reservations,id_reservation",
            "id_local"=>"required|exists:locauxes,id_local",
            "id_user"=>"required|exists:users,id",
        ]);
        Factures::create($facture);
        return response()->json($facture);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $facture=Factures::findOrFail($id);
        return response()->json($facture);
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $rse=Factures::findOrFail($id);
            $factory=$request->validate([
            "montant"=>"required",
            "date_creation"=>"required",
            "status"=>"required",
            "id_reservation"=>"required|exists:reservations,id_reservation",
            "id_local"=>"required|exists:locauxes,id_local",
            "id_user"=>"required|exists:users,id",
        ]);
        $rse->update($factory);
        return response()->json($factory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Factures::destroy($id);
        return response()->json(["message"=>"bien supprimer"]);
    }
}
