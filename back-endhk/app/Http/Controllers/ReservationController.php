<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Reservation::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $reservation=$request->validate([
            "date"=>"required",
            "heure"=>"required",
            "duree"=>"required",
            "id_user"=>"required|exists:users,id",
            "id_local"=>"required|exists:local,id_local"
        ]);
        Reservation::create($reservation);
        return response()->json($reservation);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $reservation=Reservation::findOrFail($id);
        return response()->json($reservation);
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $rse=Reservation::findOrFail($id);
            $reservation=$request->validate([
            "date"=>"required",
            "heure"=>"required",
            "duree"=>"required",
            "id_user"=>"required|exists:users,id",
            "id_local"=>"required|exists:local,id_local"
        ]);
        $rse->update($reservation);
        return response()->json($reservation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Reservation::destroy($id);
        return response()->json(["message"=>"bien supprimer"]);
    }
}
