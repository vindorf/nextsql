import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(request, {params}) {
    console.log('PARAMS', params)
    try{
        const data = await request.json();
        console.log(data);
        const {name, email } = data;
        const id = parseInt(params.id);
        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                name,
                email
            }
        });
        return NextResponse.json(updatedUser);
    } catch(error) {
        console.error("Error updating User", error);
        return NextResponse.error("Unvernal Server Error", 500)
    }
}

export async function GET(request,{params}) {
    try{
        const id = parseInt(params.id);
      
        const oneUser = await prisma.user.findUnique({
            where: {id}
        });
        return NextResponse.json(oneUser);
    } catch(error) {
        console.log('Error fetching one User', error);
        return NextResponse.error('Invernal Server Error', 500)
    }
}

export async function DELETE(request,{params}) {
    try{
        const id = parseInt(params.id);
        const deletedUser = await prisma.user.delete({
            where: {id}
        });
        return NextResponse.json(deletedUser);
    } catch(error) {
        console.log("Error deleting User", error);
        return NextResponse.error("Invernal Server Error", 500);
    }
}