import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(
    require: NextRequest,
    { params }: { params: { name: string, price: number}}
){
    if(!params.name) {
        return NextResponse.json({}) 
    }
}

export function PUT(){}

export function DELETE(){}