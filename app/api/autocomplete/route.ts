import { NextResponse } from 'next/server';
import { getSuggestions } from '@/lib/realcomp';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q || q.length < 2) {
        return NextResponse.json([]);
    }

    const results = await getSuggestions(q);
    return NextResponse.json(results);
}
