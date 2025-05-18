import { NextResponse, NextRequest } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";
import { error } from "console";

export async function GET(request: NextRequest) {
    const products = await prisma.products.findMany();
    return NextResponse.json(products)
}

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})
    
    // const product = await prisma.products.findUnique({
    //     where: { id: body.id}
    // })

    // if(product)
    //     return NextResponse.json({error:'Product already exists!'}, {status: 400});

    const newProduct = await prisma.products.create({
        data: {
            name: body.name,
            price: body.price
        }
    })
    return NextResponse.json(newProduct, {status: 201})
}
