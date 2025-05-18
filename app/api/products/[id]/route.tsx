import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";
import { error } from "console";

export async function GET(request: NextRequest, { params }: { params: {id: string}}){
    const product = await prisma.products.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!product)
        return NextResponse.json({error: 'Product not found'}, {status: 400})

    return NextResponse.json(product)
}

export async function PUT(request: NextRequest, { params }: { params: {id: string}}){
    const body = await request.json();

    const validation = schema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400});

    const product = await prisma.products.findUnique({
        where: { id: parseInt(params.id)}
    })

    if(!product)
        return NextResponse.json({error: 'Product not found'}, {status: 400});

    const newProduct = await prisma.products.update({
        where: {id: product.id},
        data:{
            name: body.name,
            price: body.price
        }
    })

    return NextResponse.json(newProduct)
}

export async function DELETE(request: NextRequest, { params }: {params: {id: string}}){
    const product = await prisma.products.findUnique({
        where: { id: parseInt(params.id)}
    })

    if(!product)
        return NextResponse.json({error:'Product not found!'}, {status: 400});

    await prisma.products.delete({
        where: { id: product.id}
    });

    return NextResponse.json({})
}